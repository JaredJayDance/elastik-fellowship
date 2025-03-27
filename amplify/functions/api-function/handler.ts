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

// Initialize DynamoDB Client
const client = new DynamoDBClient({ region: "ap-southeast-2" }); // Adjust region
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  try {
    // Scan entire table (for small datasets)
    const command = new ScanCommand({
      TableName: "StudentList"
    });

    const response = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Enable CORS
      },
      body: JSON.stringify({
        success: true,
        data: response.Items,
        count: response.Count,
      }),
    };
  } catch (error) {
    console.error("DynamoDB Scan Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Failed to export DynamoDB data",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};