import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const path = event.requestContext?.http?.path || "";
    const method = event.requestContext?.http?.method || "";

    console.log("Incoming PATH:", path);
    console.log("Incoming METHOD:", method);
    console.log("Incoming BODY:", event.body);

    const body = JSON.parse(event.body || "{}");
    const { userid, password } = body;

    // =========================
    // SIGNUP → POST /signin
    // =========================
    if (path.endsWith("/signin") && method === "POST") {

      if (!userid || !password) {
        return response(400, { error: "userid and password required" });
      }

      const existing = await dynamo.send(
        new GetCommand({
          TableName: "UserData",
          Key: { userid }
        })
      );

      if (existing.Item) {
        return response(400, { error: "User already exists" });
      }

      await dynamo.send(
        new PutCommand({
          TableName: "UserData",
          Item: {
            ...body,
            createdAt: new Date().toISOString()
          }
        })
      );

      return response(200, { message: "Signup successful" });
    }

    // =========================
    // LOGIN → POST /login
    // =========================
    if (path.endsWith("/login") && method === "POST") {

      if (!userid || !password) {
        return response(400, { error: "userid and password required" });
      }

      const user = await dynamo.send(
        new GetCommand({
          TableName: "UserData",
          Key: { userid }
        })
      );

      if (!user.Item) {
        return response(404, { error: "User not found" });
      }

      if (user.Item.password !== password) {
        return response(401, { error: "Invalid password" });
      }

      return response(200, {
        message: "Login successful",
        userData: user.Item
      });
    }

    return response(400, { error: "Invalid route" });

  } catch (error) {
    console.error("Lambda Error:", error);
    return response(500, { error: "Internal server error" });
  }
};


// =========================
// Common response helper
// =========================
function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}
