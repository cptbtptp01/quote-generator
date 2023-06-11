/* Amplify Params - DO NOT EDIT
	API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_ARN
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// aws packages
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
// image processing packages
const sharp = require("sharp");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

// function to update dynamodb table
async function updateDynamoDBTable() {
  const quoteTableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
  const quoteObjectID = "978-0060554736";

  try {
    var quoteParams = {
      TableName: quoteTableName,
      Key: {
        id: quoteObjectID,
      },
      UpdateExpression: "SET #quoteGenerated = #quoteGenerated + :inc",
      ExpressionAttributeValues: {
        ":inc": 1,
      },
      ExpressionAttributeNames: {
        "#quoteGenerated": "quoteGenerated",
      },
      ReturnValues: "UPDATED_NEW", // update only new values
    };

    const updateQuoteObject = await docClient.update(quoteParams).promise();
    return updateQuoteObject;
  } catch (err) {
    console.log("Error updating quote object in DynamoDB", err);
  }
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const apiURL = "https://zenquotes.io/api/random";

  async function getRandomQuote(apiURLInput) {
    // validate response to the api
    // the HTTP response object returned by the fetch function
    // ensures that its value remains unchanged throughout the scope of the function
    const response = await fetch(apiURLInput);
    if (!response.ok) {
      throw new Error("Failed to fetch random quote");
    }
    // store the parsed JSON data retrieved from the response
    const quoteData = await response.json();
    console.log(quoteData);

    const [{ q: quoteText, a: quoteAuthor }] = quoteData;
    // console.log(`Quote: ${quoteText}\nAuthor: ${quoteAuthor}`);

    // image construction
    const width = 750;
    const height = 469;
    const text = quoteText;
    const words = text.split(" "); // string into list split by whitespace
    const wordPerLine = 4; // max words per line
    let newText = "";

    // Calculate the font size based on the length of the quote //
    const wordCount = words.length;
    console.log("wordCount", wordCount);
    // default length
    let fontSize = 40;
    // check length and update font size 25, 15, 9
    if (wordCount > 10) {
      fontSize = 35;
    } else if (wordCount > 15) {
      fontSize = 28;
    } else if (wordCount > 20) {
      fontSize = 20;
    }

    // define tspanElements for max words each line
    let tspanEle = "";
    for (let i = 0; i < words.length; i++) {
      newText += words[i] + " ";
      // update newText back to empty string
      if ((i + 1) % wordPerLine === 0) {
        tspanEle += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
        newText = "";
      }
    }
    if (newText !== "") {
      tspanEle += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
    }

    // calculate the number of lines //
    const lineCount = Math.ceil(wordCount / wordPerLine);
    
    // calculate the vertical position //
    const lineHeight = 1.2 * fontSize;
    const contentHeight = lineCount * lineHeight;
    const contentY = (height - contentHeight) / 2.5

    // console.log(words);
    console.log(tspanEle);

    //construct svg
    const svg = `
    <svg width="${width}" height="${height}">
        <style>
            .author {
                font-family: 'Roboto Mono', monospace;
                font-size: ${fontSize/1.2}px;
                padding: 50px;
                font-weight: bold;
                fill: #ffffff;
                text-anchor: middle; /* Center the author text */
            }
            .footer {
                font-family: 'Roboto Mono', monospace;
                font-size: 18px;
                fill: #ffffff;
                font-weight: bold;
                font-style: italic;
                text-anchor: middle;
            }
            .content {
                font-family: 'Roboto Mono', monospace;
                font-size: ${fontSize}px;
                fill: #ffffff;
                font-weight: bold;
                text-anchor: middle; /* Center the content text */
            }
        </style>
        <g>
            <rect x="0" y="0" width="${width}" height="0"></rect>
            <text id="content" x="${width / 2}" y="${contentY}" text-anchor="middle" class="content">
            ${tspanEle}
            <tspan x="${width / 2}" dy="1.8em" class="author">- ${quoteAuthor}</tspan>
            </text>
        </g>
        <text x="${width / 2}" y="${height - 20}" class="footer">Developed by @huiru | Quotes from ZenQuote.io</text>
    </svg>
  `;

    // add background image for the svg
    const background = [
      "assets/bora.png",
      "assets/broken.png",
      "assets/jon.png",
    ];
    const randomIndex = Math.floor(Math.random() * background.length);
    const randomBackground = background[randomIndex];

    // composite svg and background image
    const timestamp = new Date().toLocaleString().replace(/[^\d]/g, ""); // remove all non-digit characters
    const svgBuffer = Buffer.from(svg); // convert svg string to buffer

    const imagePath = path.join("/tmp", "quote-card.png");
    const image = await sharp(randomBackground)
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .toFile(imagePath);

    // update dynamodb table
    try {
      updateDynamoDBTable();
    } catch (err) {
      console.log("Error updating DynamoDB table", err);
    }
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
      },
      body: fs.readFileSync(imagePath).toString("base64"),
      isBase64Encoded: true,
    };
  }
  return await getRandomQuote(apiURL);
};
