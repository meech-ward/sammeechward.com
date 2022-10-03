import { ulid } from 'ulid'
import { putItem, getItem, queryItem } from './dynamo'

export async function getUser({email}) {
  const user = await queryItem({
    KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${email}`,
      ":sk": `USER#${email}`
    },
    IndexName: "GSI1"
  })

  return user
}

export async function createPost(username, description, imageName) {
  const Item = {
    PK: "USER#" + username,
    SK: "POST#" + ulid(),
    description,
    imageName,
    created: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  }

  let createParams = {
    TableName: tableName,
    Item: Item
  }

  let updateParams = {
    TableName: tableName,
    Key: {
      PK: "USER#" + username,
      SK: "USER#" + username,
    },
    UpdateExpression: "SET postCount = postCount+ :inc",
    ExpressionAttributeValues: {
        ":inc": 1
    }
  }

  await dynamodb.put(createParams).promise()
  await dynamodb.update(updateParams).promise()

  return Item
}

export async function createComment(userId, postId, text) {
  const Item = {
    PK: "POST#" + postId,
    SK: "COMMENT#" + ulid(),
    username,
    text,
    created: new Date().toISOString(),
  }
  let params = {
    TableName: tableName,
    Item
  }

  let updateParams = {
    TableName: tableName,
    Key: {
      PK: "USER#" + username,
      SK: "POST#" + postId,
    },
    UpdateExpression: "SET commentCount = commentCount+ :inc",
    ExpressionAttributeValues: {
        ":inc": 1
    }
  }

  await dynamodb.put(params).promise()
  await dynamodb.update(updateParams).promise()

  return Item
}

export async function getPost(username, postId) {
  let params = {
    TableName: tableName,
    Key: {
      PK: "USER#" + username,
      SK: "POST#" + postId
    }
  }
  
  const result = await dynamodb.get(params).promise()
  return result
}

export async function getPosts(username) {
  let params = {
    TableName: tableName,
    KeyConditions: {
      PK: {
        ComparisonOperator: 'EQ',
        AttributeValueList: ["USER#" + username]
      },
      SK: {
        ComparisonOperator: 'BEGINS_WITH', // [IN, NULL, BETWEEN, LT, NOT_CONTAINS, EQ, GT, NOT_NULL, NE, LE, BEGINS_WITH, GE, CONTAINS]
        AttributeValueList: ["POST#"]
      }
    },
    ScanIndexForward: false
  }

  const result = await dynamodb.query(params).promise()
  return result
}

export async function getComments(postId) {
  let params = {
    TableName: tableName,
    KeyConditions: {
      PK: {
        ComparisonOperator: 'EQ',
        AttributeValueList: ["POST#" + postId]
      },
      SK: {
        ComparisonOperator: 'BEGINS_WITH', // [IN, NULL, BETWEEN, LT, NOT_CONTAINS, EQ, GT, NOT_NULL, NE, LE, BEGINS_WITH, GE, CONTAINS]
        AttributeValueList: ["COMMENT#"]
      }
    },
    ScanIndexForward: false
  }

  const result = await dynamodb.query(params).promise()
  return result
}
