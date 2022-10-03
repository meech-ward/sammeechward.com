import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const tableName = process.env.AWS_DYNAMO_TABLE_NAME
const region = process.env.AWS_DYNAMO_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const ddbConfig = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
}
const ddbClient = new DynamoDBClient(ddbConfig)


const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: true, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: true, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB document client.
export const dynamodb = DynamoDBDocument.from(ddbClient, translateConfig);
export const dynamodbClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);



export async function putItem(Item) {
  const params = {
    TableName: tableName,
    Item
  }
  const data = await dynamodbClient.send(new PutCommand(params));
}