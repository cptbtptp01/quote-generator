import React, { useState, useEffect, use } from "react";

// material ui
import { Backdrop, Fade, Modal, Grow } from "@mui/material";

// components
import {
    FooterLink,
    GenerateQuoteButtonText,
    ImageBlobCon,
    QuoteGeneratorButton,
    QuoteGeneratorModalCon,
    QuoteGeneratorModalInnerCon,
    QuoteGeneratorSubTitle,
    QuoteGeneratorTitle,
} from "./quoteGeneratorElements";
import ImageBlob from "./imageBlob";

// QuoteGeneratorModal Interface
interface QuoteGeneratorModalProps {
    open: boolean;
    close: () => void;
    processingQuote: boolean;
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
    quoteReceived: String | null;
    setQuoteReceived: React.Dispatch<React.SetStateAction<string | null>>;
}

// style for modal
const style = {};

const QuoteGeneratorModal = ({
    open,
    close,
    processingQuote,
    setProcessingQuote,
    quoteReceived,
    setQuoteReceived,
}: QuoteGeneratorModalProps) => {
    // data get from lambda
    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    // Function: Handling the download of quote card
    const handleDownload = () => {
        const link = document.createElement('a');
        if (typeof blobUrl === 'string') {
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        }
    };

    // function: handle receiving quote
    useEffect(() => {
        if (quoteReceived) {
            const binaryData = Buffer.from(quoteReceived, "base64");
            const blob = new Blob([binaryData], { type: "image/png" });
            const urlGenerated = URL.createObjectURL(blob);
            console.log(urlGenerated); // track what is generated
            setBlobUrl(urlGenerated);

            return () => {
                // clean up old url each time new url is generated
                URL.revokeObjectURL(urlGenerated);
            };
        }
    }, [quoteReceived]);

    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <QuoteGeneratorModalCon sx={style}>
                <QuoteGeneratorModalInnerCon>
                    {/* state #1 processing request of quote + quote is empty */}
                    {processingQuote === true && quoteReceived === null && (
                        <>
                            <QuoteGeneratorTitle>Generating Quote...</QuoteGeneratorTitle>
                        </>
                    )}
                    {/* state #2 quote state fulfilled */}
                    {quoteReceived !== null && (
                        <>
                            <QuoteGeneratorTitle>
                                Quote Generated!
                            </QuoteGeneratorTitle>
                            <ImageBlobCon>
                                <ImageBlob quoteReceived={quoteReceived} blobUrl={blobUrl} />
                            </ImageBlobCon>
                            <QuoteGeneratorButton onClick={handleDownload}>
                                    <GenerateQuoteButtonText>
                                        Download
                                    </GenerateQuoteButtonText>
                                </QuoteGeneratorButton>
                        </>
                    )}
                </QuoteGeneratorModalInnerCon>
            </QuoteGeneratorModalCon>
        </Modal>
    );
};
export default QuoteGeneratorModal;
