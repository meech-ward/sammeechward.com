import { ulid } from 'ulid'
import mainTable from './mainTable'
import postsTable from './postsTable'

import entityDetails from '../../helpers/entityDetails'

import jwt from 'jsonwebtoken'

function mapComment(comment) {
  const obj = {
    ...comment,
    id: comment.sk.split("#")[1]
  }

  delete obj.pk
  delete obj.sk
  delete obj.GSI1PK
  delete obj.GSI1SK

  return obj
}

export async function getUser({ email }) {
  const {Item} = await mainTable.queryItem({
    KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${email}`,
      ":sk": `USER#${email}`
    },
    IndexName: "GSI1"
  })

  return Item
}

export async function createComment({ entitySlug, text, user }) {
  const sk = "COMMENT#" + ulid()
  const Item = {
    pk: "ENTITY#" + entitySlug,
    sk,
    GSI1PK: "USER#" + user.email,
    GSI1SK: sk,
    name: user.name,
    email: user.email,
    image: user.image,
    text,
    created: new Date().toISOString(),
  }
  await mainTable.putItem(Item)

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
  
    const data = await mainTable.updateItem(setCountParams)
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
    await mainTable.updateItem(updateParams)
  }

  return mapComment(Item)
}

export async function getComments({slug}) {

  const {Items} = await mainTable.queryItems({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :comment)",
    ExpressionAttributeValues: {
      ":pk": "ENTITY#" + slug,
      ":comment": `COMMENT`
    },
  })
  

  return Items.map(mapComment)

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


// export async function getAllPosts() {
//   const params = {
//     ProjectionExpression: "dirPath, imagesPath, indexPath, slug, tags, image, #tp, href, title, description, #dt",
//     ExpressionAttributeNames: { "#tp": "type", "#dt": "date" },
//     FilterExpression: "begins_with(pk, :pk)",
//     ExpressionAttributeValues: {
//       ":pk": "ENTITY#"
//     },
//     Limit: 20,
//     // ExclusiveStartKey
//   }

//   const posts = await postsTable.scan(params)
//   return posts.map(entityDetails).sort((a, b) => new Date(b.date) - new Date(a.date))
// }

function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export async function getPost(slug) {

  const data = await postsTable.queryItem({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#${slug}`
    }
  })

  return entityDetails(data.Item)
}

export async function getAllPosts(lastEvaluatedKey, limit = 30) {
  const params = {
    ProjectionExpression: "dirPath, imagesPath, indexPath, slug, tags, image, #tp, href, title, description, #dt",
    ExpressionAttributeNames: { "#tp": "type", "#dt": "date" },
    KeyConditionExpression: "GSI1PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#POST`
    },
    IndexName: "GSI1",
    Limit: limit,
    ScanIndexForward: false,
  }
  if (lastEvaluatedKey) {
    try {
      const key = await promisify(jwt.verify)(lastEvaluatedKey, process.env.REQUEST_SECRET)
      delete key.iat
      params.ExclusiveStartKey = key

    } catch (error) {


    }
    
  }
  const { Items, ScannedCount, LastEvaluatedKey} = await postsTable.queryItems(params)

  const nextKey = LastEvaluatedKey && jwt.sign(LastEvaluatedKey, process.env.REQUEST_SECRET)
  return { posts: Items.map(entityDetails), count: ScannedCount, lastEvaluatedKey: nextKey }
}

export async function getFeaturedPosts() {
  const {Items} =  await postsTable.queryItems({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": "SETTING#featured",
      ":sk": "SETTING"
    },
  })

  return Items.map(entityDetails)
}

export async function getMostRecentVideo() {
  const {Item} = await postsTable.getItem({
    Key: {
      pk: "SETTING#most-recent-video",
      sk: "SETTING#most-recent-video"
    }
  })
  return entityDetails(Item)
}