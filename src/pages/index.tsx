import React, { use, useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
// components 
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuetoButtonText, WhiteBackgroundCon, QuoteGeneratorButton, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle, FooterText } from '../../components/quoteGenerator/quoteGenerator'

// assets
import cloud1 from 'assets/cloud-and-thunder.png'
import cloud2 from 'assets/cloudy-weather.png'
import { API } from 'aws-amplify'
import { quoteQueryName } from '@/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'

// interface for dynamoDB object
// define data fetched from dynamoDB
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quoteGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// type guard for fetch function
function isGraphQLResultForquoteQueryName(response: any): response is GraphQLResult<{ 
    quoteQueryName: { items: [UpdateQuoteInfoData] } 
  }> {
  return response.data && response.data.quoteQueryName && response.data.quoteQueryName.items;
}

export default function Home() {
  // HOME
  // dynamic data
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

  // async function before the return statement: fetch data from dynamoDB (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quoteQueryName,
        authMode: 'AWS_IAM',
        variables: { queryName: 'LIVE'},
      })
      // console.log('response from dynamoDB', response); // test if data is fetched

      // check if response is of type GraphQLResult
      if (!isGraphQLResultForquoteQueryName(response)) {
        throw new Error('response is not of type GraphQLResult');
      }
      if (!response.data) {
        throw new Error('response.data is undefined');
      }

      const receivedNumberOfQuotes = response.data.quoteQueryName.items[0].quoteGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);

    } catch (error) {
      console.log('error fetching data from dynamoDB', error);
    }
  }

  // invoke the function and unsubscribe after the first render
  useEffect(() => { updateQuoteInfo() }, []);

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
        {/* <QuoteGeneratorModal 
        /> */}

        {/* quote generator */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>

            <QuoteGeneratorTitle>
              Your Daily Quote Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Click the button below to generate a random quote! 
              <br />
              provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <QuoteGeneratorButton>
              <GenerateQuetoButtonText 
              // onClick={null}
              > Get Inspired!
              </GenerateQuetoButtonText>
            </QuoteGeneratorButton>

          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/* Background Images */}
        <BackgroundImage1
          src={cloud1}
          height="300"
          alt="cloudybackground1"
        />

        <BackgroundImage2
          src={cloud2}
          height="250"
          alt="cloudybackground2"
        />

        {/* footer container */}
        <FooterCon>
          <FooterText>
            Quotes Generated: {numberOfQuotes}  
          </FooterText>
          <div>
            Developed by <FooterLink href="https://github.com/cptbtptp01" target="_blank" rel="noopener noreferrer"> @huiru </FooterLink>
          </div>
        </FooterCon>

      </WhiteBackgroundCon>
    </>
  )
}
