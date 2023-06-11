// function component - hook
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { RelativeImage } from "./quoteGeneratorElements";

interface ImageBlobProps {
    quoteReceived: String | null;
    blobUrl: string | null;
}

const ImageBlob = ({
    quoteReceived,
    blobUrl 
}: ImageBlobProps) => {
    //const [blobUrl, setBlobUrl] = useState<string | null>(null);

    // mock process: hook to speak to lambda, handle receiving quote
    // useEffect(() => {
    //     const response = {
    //         "statusCode": 200,
    //         "headers": {
    //             "Content-Type": "image/png",
    //             "Access-Control-Allow-Origin": "*"
    //         },
    //         //image string fetch from lambda
    //         "body": quoteReceived,
    //         "isBase64Encoded": true
    //     }
    //     const binaryData = Buffer.from(response.body, 'base64');
    //     const blob = new Blob([binaryData], { type: response.headers["Content-Type"] });
    //     const newBlobUrl = URL.createObjectURL(blob);
    //     setBlobUrl(newBlobUrl);
    //     return () => {
    //         // clean up old url each time new url is generated
    //         URL.revokeObjectURL(newBlobUrl);
    //     }
    // }, []);

    if (!blobUrl) {
        return null;
    }

    return (
        console.log("blobUrl: ", blobUrl, "quoteReceived: ", quoteReceived, "ImageBlob.tsx"),
        <RelativeImage src={blobUrl} alt="Generated quote card" />
    )
}

export default ImageBlob