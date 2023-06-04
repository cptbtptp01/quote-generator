import React from "react";

// material ui
import { Backdrop, Fade, Modal, Grow } from "@mui/material";

// components
import { QuoteGeneratorModalCon, QuoteGeneratorModalInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from "./quoteGenerator";

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
const style = {

};

const QuoteGeneratorModal = ({
    open, 
    close, 
    processingQuote, 
    setProcessingQuote, 
    quoteReceived, 
    setQuoteReceived
}: QuoteGeneratorModalProps) => {
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
                        {(processingQuote === true && quoteReceived === null) && 
                            <>
                                <QuoteGeneratorTitle>Generating Quote...</QuoteGeneratorTitle>
                            </>
                        }
                        {/* state #2 quote state fulfilled */}
                        {quoteReceived !== null &&
                            <>
                                <QuoteGeneratorTitle>Quote Generated!</QuoteGeneratorTitle>
                                <QuoteGeneratorSubTitle style={{marginTop: "20px"}}>
                                    Preview the quote
                                </QuoteGeneratorSubTitle>
                                <ImageBlobCon>

                                </ImageBlobCon>
                                <AnimatedDownloadButton
                                />
                            </>
                        }
                    </QuoteGeneratorModalInnerCon>
                </QuoteGeneratorModalCon>

            
            
        </Modal>
    )
}
export default QuoteGeneratorModal