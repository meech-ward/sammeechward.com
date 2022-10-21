import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { PutCommand, UpdateCommand, GetCommand, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";


export function makeTable(tableName, region, accessKeyId, secretAccessKey) {
  const exports = {}
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
  const dynamodb = DynamoDBDocument.from(ddbClient, translateConfig);
  exports.dynamodb = dynamodb
  const dynamodbClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
  exports.dynamodbClient = dynamodbClient



  exports.putItem = putItem
  async function putItem(Item) {
    const params = {
      TableName: tableName,
      Item
    }
    const data = await dynamodbClient.send(new PutCommand(params));
    return data
  }


  exports.updateItem = updateItem
  async function updateItem(updateParams) {
    const params = {
      TableName: tableName,
      ...updateParams
    }
    const data = await dynamodbClient.send(new UpdateCommand(params));
    return data
  }

  exports.getItem = getItem
  async function getItem({ pk, sk, Key, IndexName }) {
    const params = {
      TableName: tableName,
      Key: Key || { pk, sk },
      IndexName
    }

    const data = await dynamodb.send(new GetCommand(params))
    return data
  }

  exports.queryItems = queryItems
  async function queryItems(props) {
    const params = {
      TableName: tableName,
      ...props
    }

    const data = await dynamodb.send(new QueryCommand(params))
    return data
  }

  exports.queryItem = queryItem
  async function queryItem({ ExpressionAttributeValues, KeyConditionExpression, IndexName }) {
    const data = await queryItems({ ExpressionAttributeValues, KeyConditionExpression, IndexName })
    return { ...data, Item: data.Items[0] }
  }

  exports.batchGetItems = batchGetItems
  async function batchGetItems({ RequestItems }) {
    const params = {
      RequestItems: {
        [tableName]: RequestItems
      }
    }
    const data = await dynamodbClient.send(new BatchGetCommand(params));
    return data
  }

  exports.scan = scan
  async function scan(props) {
    const params = {
      TableName: tableName,
      ...props
    }

    const data = await dynamodbClient.send(new ScanCommand(params));
    return data.Items
  }

  return exports
}