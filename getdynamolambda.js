import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const queryType = event.queryStringParameters?.type || "all"; // all or fraud

    let params = { TableName: "Transactions" };

    if (queryType === "fraud") {
      params.FilterExpression = "Fraud = :f";
      params.ExpressionAttributeValues = { ":f": 1 };
    }

    const result = await dynamo.send(new ScanCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow your frontend domain
      },
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
