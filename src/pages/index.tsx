import React, { use, useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

// components
import {
  BackgroundImage1,
  BackgroundImage2,
  FooterCon,
  FooterLink,
  GenerateQuoteButtonText,
  WhiteBackgroundCon,
  QuoteGeneratorButton,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
  FooterText,
} from "../../components/quoteGenerator/quoteGeneratorElements";
import QuoteGeneratorModal from "../../components/quoteGenerator";

// assets
import cloud1 from "assets/cloud-and-thunder.png";
import cloud2 from "assets/cloudy-weather.png";

// aws
import { API } from "aws-amplify";
import { generateAQuote, quoteQueryName } from "@/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GenerateAQuoteQuery } from "@/API";

// interface for appSync <> lambda json response
interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number;
    headers: { [key: string]: string };
    body: string;
  };
}

// interface for dynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quoteGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// type guard for fetch function
function isGraphQLResultForquoteQueryName(
  response: any
): response is GraphQLResult<{
  quoteQueryName: { items: [UpdateQuoteInfoData] };
}> {
  return (
    response.data &&
    response.data.quoteQueryName &&
    response.data.quoteQueryName.items
  );
}

export default function Home() {
  // dynamic data
  const [numberOfQuotes, setNumberOfQuotes] = useState<number | null>(0);
  // modal state
  const [openGenerator, setOpenGenerator] = useState(false);
  const [processingQuote, setProcessingQuote] = useState(false);
  // function to speak to lambda, passing in the quote
  const [quoteReceived, setQuoteReceived] = useState<string | null>(null);

  // async function before the return statement: fetch data from dynamoDB (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quoteQueryName,
        authMode: "AWS_IAM",
        variables: { queryName: "LIVE" },
      });
      console.log("response from dynamoDB", response); // test if data is fetched

      // check if response is of type GraphQLResult
      if (!isGraphQLResultForquoteQueryName(response)) {
        throw new Error("response is not of type GraphQLResult");
      }
      if (!response.data) {
        throw new Error("response.data is undefined");
      }

      const receivedNumberOfQuotes =
        response.data.quoteQueryName.items[0].quoteGenerated;
      console.log(
        "receivedNumberOfQuotes type:",
        typeof receivedNumberOfQuotes
      );
      setNumberOfQuotes(receivedNumberOfQuotes);
    } catch (error) {
      console.log("error fetching data from dynamoDB", error);
    }
  };

  // invoke the function and unsubscribe after the first render
  useEffect(() => {
    updateQuoteInfo();
  }, []);

  //* function to close modal *//
  const closeGenerator = () => {
    setOpenGenerator(false);
    setProcessingQuote(false);
    setQuoteReceived(null);
  };
  //* function to open modal *//
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault(); // prevent page from reloading
    setOpenGenerator(true);
    setProcessingQuote(true);
    try {
      // run lambda function
      const runFunction = "runFunction";
      const runFunctionStringified = JSON.stringify(runFunction);
      const response = await API.graphql<GenerateAQuoteData>({
        query: generateAQuote,
        authMode: "AWS_IAM",
        variables: { input: runFunctionStringified },
      });
      const responseStringified = JSON.stringify(response);
      const responseReStringified = JSON.stringify(responseStringified);
      const bodyIndex = responseReStringified.indexOf("body=") + 5;
      const bodyAndBase64 = responseReStringified.substring(bodyIndex);
      const bodyArray = bodyAndBase64.split(",");
      const body = bodyArray[0];
      console.log("response from lambda", body); // test if data is fetched
      setQuoteReceived(body);
      // end state
      setProcessingQuote(false);

      // fetch if any new quotes are generated from counter
      updateQuoteInfo();

      // setTimeout(() => {
      //   setProcessingQuote(false);
      // }, 3000);
    } catch (error) {
      console.log("error generating quote", error);
      setProcessingQuote(false);
    }
  };

  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* background */}
      <WhiteBackgroundCon>
        {/* quote generator modal pop-up */}
        <QuoteGeneratorModal
          open={openGenerator}
          close={closeGenerator}
          processingQuote={processingQuote}
          setProcessingQuote={setProcessingQuote}
          quoteReceived={quoteReceived}
          setQuoteReceived={setQuoteReceived}
        />

        {/* quote generator landing part */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Your Daily Quote Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Click the button below to generate a random quote!
              <br />
              provided by{" "}
              <FooterLink
                href="https://zenquotes.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZenQuotes API
              </FooterLink>
              .
            </QuoteGeneratorSubTitle>

            {/* invoke modal */}
            <QuoteGeneratorButton onClick={handleOpenGenerator}>
              <GenerateQuoteButtonText>Get Inspired!</GenerateQuoteButtonText>
            </QuoteGeneratorButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/* Background Images */}
        <BackgroundImage1 src={cloud1} height="300" alt="cloudybackground1" />

        <BackgroundImage2 src={cloud2} height="250" alt="cloudybackground2" />

        {/* footer container */}
        <FooterCon>
          <FooterText>
            Quotes Generated: {numberOfQuotes !== null ? numberOfQuotes : 'Loading...'}
            </FooterText>

          <div>
            Developed by{" "}
            <FooterLink
              href="https://github.com/cptbtptp01"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              @huiru{" "}
            </FooterLink>
          </div>
        </FooterCon>
      </WhiteBackgroundCon>
    </>
  );
}
