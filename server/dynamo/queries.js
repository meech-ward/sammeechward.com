import { ulid } from 'ulid'
import { putItem, getItem, queryItem, queryItems, updateItem } from './dynamo'

function mapComment(comment) {
  return {
    ...comment,
    id: comment.sk.split("#")[1]
  }
}

export async function getUser({ email }) {
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

export async function createComment({ articleId, text, user }) {
  const sk = "COMMENT#" + ulid()
  const Item = {
    pk: "ENTITY#" + articleId,
    sk,
    GSI1PK: "USER#" + user.email,
    GSI1SK: sk,
    name: user.name,
    email: user.email,
    image: user.image,
    text,
    created: new Date().toISOString(),
  }
  await putItem(Item)

  try {
    let setCountParams = {
      Key: {
        pk: user.pk,
        sk: user.sk,
      },
      UpdateExpression: "SET commentCount = :val",
      ExpressionAttributeValues: {
        ":val": 1
      },
      ConditionExpression: 'attribute_not_exists(commentCount)'
    }
  
    const data = await updateItem(setCountParams)
  } catch (error) {
    if (error.name !== "ConditionalCheckFailedException") {
      throw error
    }
  
    let updateParams = {
      Key: {
        pk: user.pk,
        sk: user.sk,
      },
      UpdateExpression: "SET commentCount = commentCount+ :inc",
      ExpressionAttributeValues: {
        ":inc": 1
      }
    }
    await updateItem(updateParams)
  }

  return mapComment(Item)
}

export async function getComments(articleId) {

  const comments = await queryItems({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :comment)",
    ExpressionAttributeValues: {
      ":pk": "ENTITY#" + articleId,
      ":comment": `COMMENT`
    },
  })
  

  return comments.map(mapComment)

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
