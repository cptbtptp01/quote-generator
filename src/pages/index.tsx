import React, { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
// components 
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuetoButtonText, WhiteBackgroundCon, QuoteGeneratorButton, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '../../components/quoteGenerator/quoteGenerator'

// assets
import cloud1 from 'assets/cloud-and-thunder.png'
import cloud2 from 'assets/cloudy-weather.png'

export default function Home() {
  // HOME
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

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
              provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <QuoteGeneratorButton>
              <GenerateQuetoButtonText onClick={null}> Get Inspired!
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
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed by <FooterLink href="https://github.com/cptbtptp01" target="_blank" rel="noopener noreferrer"> @huiru </FooterLink>
          </>
        </FooterCon>

      </WhiteBackgroundCon>
    </>
  )
}
