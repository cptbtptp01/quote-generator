import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

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
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: black;
    z-index: 999999;
`;

export const FooterText = styled.div`
    color: black;
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 10px;
`;

export const FooterLink = styled(Link)`
    color: black;
`;

export const QuoteGeneratorCon= styled.div`
    min-height: 350px;
    min-width: 350px;
    height: 70vh;
    width: 70vw;
    border-radius: 0px;
    //center
    top: 50%; 
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    // above background
    z-index: 2; 
`;

export const QuoteGeneratorInnerCon = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    width: 100%;
`;

export const QuoteGeneratorTitle = styled.div`
    font-family: 'Roboto Mono', monospace;
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
    font-family: 'Roboto Mono', monospace;
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

export const GenerateQuetoButtonText = styled.div`
    color: black;
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    width: 100%;
    text-align: center;
`;