import type { APIGatewayProxyHandler } from "aws-lambda";
/** 
export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    // Modify the CORS settings below to match your specific requirements
    headers: {
      "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
      "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
    },
    body: JSON.stringify("Hello from myFunction!"),
  };
};
*/

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async () => {
    try {
      const response = await docClient.send(new ScanCommand({
        TableName: "StudentList"
      }));
  
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Enable CORS if needed
        },
        body: JSON.stringify({
          success: true,
          data: response.Items,
          count: response.Count,
          scannedCount: response.ScannedCount
        })
      };
    } catch (error) {
      console.error('DynamoDB error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'Failed to retrieve data',
        })
      };
    }
  };