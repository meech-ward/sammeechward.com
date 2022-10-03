import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { PutCommand, UpdateCommand, GetCommand, ExecuteStatementCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

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
  return data
}


export async function updateItem(updateParams) {
  const params = {
    TableName: tableName,
    ...updateParams
  }
  const data = await dynamodbClient.send(new UpdateCommand(params));
  return data
}

// export async function getItem({}) {
//   const query = `
//   select * from "${tableName}"."GSI1"
//   where GSI1PK='USER#sam@meech-ward.me'
//   AND GSI1SK='?'`
//   const params = {
//     Statement: query,
//     Parameters: [{ "S": `idk` }],
//   }
//   try {
//   console.log("get item", params)
//   const data = await dynamodbClient.send(new ExecuteStatementCommand(params))
//   console.log("get item", data)
//   return data.Items[0]
// } catch (error) {
//   console.log(error)
// }
// }

export async function getItem({pk, sk, Key, IndexName}) {
  const params = {
    TableName: tableName,
    Key: Key || { pk, sk },
    IndexName
  }
  
  try {
    const data = await dynamodb.send(new GetCommand(params))
    return data.Item
  } catch (error) {
    console.log(error)
  }
}

export async function queryItems({pk, sk, KeyConditionExpression, IndexName}) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: KeyConditionExpression || "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": pk,
      ":sk": sk
    },
    IndexName
  }
  
  try {
    const data = await dynamodb.send(new QueryCommand(params))
    return data.Items
  } catch (error) {
    console.log(error)
  }
}

export async function queryItems({ExpressionAttributeValues, KeyConditionExpression, IndexName}) {
  const params = {
    TableName: tableName,
    KeyConditionExpression,
    ExpressionAttributeValues,
    IndexName
  }
 
  const data = await dynamodb.send(new QueryCommand(params))
  return data.Items
}
export async function queryItem({ExpressionAttributeValues, KeyConditionExpression, IndexName}) {
  const items = await queryItems({ExpressionAttributeValues, KeyConditionExpression, IndexName})
  return items[0]
}

  // const params = {
  //   TableName: tableName,
  //   Key: {
  //     pk,
  //     sk
  //   }
  // }

//   const data = await dynamodbClient.send(new GetCommand(params));
//   return data.Item
// }