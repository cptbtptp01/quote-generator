import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// material ui
import { Box, Paper } from "@mui/material";

export const WhiteBackgroundCon = styled.div`
    background: white;
    background-size: 400% 400%;
    height: calc(100% - 15px);
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

export const BackgroundImage1 = styled(Image)`
    position: relative;
    z-index: 1;
    margin-left: -10px;
    margin-top: -10px;
`;

export const BackgroundImage2 = styled(Image)`
    position: fixed;
    z-index: 1;
    right: -90px;
    bottom: -10px;
`;

export const FooterCon = styled.div`
    width: 100%;
    height: 50px;
    margin-top: 10px;
    padding: 10px;
    text-align: center;
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: black;
    z-index: 999999;
`;

export const FooterText = styled.div`
    color: black;
    font-family: "Roboto Mono", monospace;
    margin-bottom: 10px;
`;

export const FooterLink = styled(Link)`
    color: black;
    transition: 0.3s all ease-in-out;
    &:hover {
        /* Add styles for hover effect */
        /* For example, change the color */
        color: darkgray;
        /* You can add more styles as needed */
    }
`;

export const QuoteGeneratorCon = styled.div`
    min-height: 350px;
    min-width: 350px;
    height: 70vh;
    width: 70vw;
    border-radius: 0px;
    //center
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    // above background
    z-index: 2;
`;

export const QuoteGeneratorInnerCon = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
`;

export const QuoteGeneratorTitle = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 24px;
    color: black;
    text-align: center;
    // padding for the text
    // top right bottom left
    padding: 0px 20px 0px 20px;
    // center at the top
    position: relative;
    // media query
    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

export const QuoteGeneratorSubTitle = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    color: black;
    text-align: center;
    // padding for the text
    // top right bottom left
    padding: 0px 20px 0px 20px;
    // center at the top
    position: relative;
    width: 100%;
    margin-top: 20px;
    // media query
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

export const QuoteGeneratorButton = styled.div`
    height: 30px;
    width: 120px;
    border: 2px solid darkgrey;
    border-radius: 3px;
    background-color: transparent;

    margin-top: 20px;
    position: relative;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
    top: 20px;
    margin: auto;
    transform-origin: center;

    &:hover {
        background-color: darkgrey;
        transform-origin: center;
    }
`;

export const GenerateQuoteButtonText = styled.div`
    color: black;
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    text-align: center;
`;

export const QuoteGeneratorModalCon = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    box-shadow: 24;
  /* transition: 0.2s all ease-in-out; */

    background: rgb(255 255 255 / 100%);
    box-shadow: 0 8px 32px 0 rgb(135 135 135 / 37%);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    &:focus {
        outline: none !important;
    }
`;

export const QuoteGeneratorModalInnerCon = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    `;

export const ImageBlobCon = styled.div`
    position: relative;
    text-align: center;
    top: 10px;
    margin-top: 20px;
    transition: 0.3s all ease-in-out;
    width: fit-content;
    margin: auto;
    height: fit-content;
    z-index: 99999;
    `;

export const RelativeImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    `;
