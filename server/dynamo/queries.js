import { ulid } from 'ulid'
import mainTable from './mainTable'
import postsTable from './postsTable'

import entityDetails from '../../helpers/entityDetails'

import jwt from 'jsonwebtoken'

import { sanitizeDynamoObject, mapComment, mapPost, mapFeatured, promisify } from './utils'


/*
  User
*/

export async function getUser({ email }) {
  const { Item } = await mainTable.queryItem({
    KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${email}`,
      ":sk": `USER#${email}`
    },
    IndexName: "GSI1"
  })

  return sanitizeDynamoObject(Item)
}

async function updateUserCommentCount(user) {
  const pk = `USER#${user.id}`
  const sk = `USER#${user.id}`
  try {
    let setCountParams = {
      Key: { pk, sk },
      UpdateExpression: "SET commentCount = :val",
      ExpressionAttributeValues: {
        ":val": 1
      },
      ConditionExpression: 'attribute_not_exists(commentCount)'
    }

    const data = await mainTable.updateItem(setCountParams)
  } catch (error) {
    if (error.name !== "ConditionalCheckFailedException") {
      console.error({ error })
      throw error
    }

    let updateParams = {
      Key: { pk, sk },
      UpdateExpression: "SET commentCount = commentCount+ :inc",
      ExpressionAttributeValues: {
        ":inc": 1
      }
    }
    await mainTable.updateItem(updateParams)
  }
}

async function updatePostCommentCount(entitySlug) {

  let { Item } = await postsTable.queryItem({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#${entitySlug}`
    }
  })
  let updateParams = {
    Key: {
      pk: Item.pk,
      sk: Item.sk
    },
    UpdateExpression: "SET commentCount = commentCount+ :inc",
    ExpressionAttributeValues: {
      ":inc": 1
    }
  }

  await postsTable.updateItem(updateParams)
}

export async function createComment({ entitySlug, text, user, respondingToComment }) {

  const sk = "COMMENT#" + ulid()
  const pk = "ENTITY#" + entitySlug
  const Item = {
    pk,
    sk,
    GSI1PK: "USER#" + user.email,
    GSI1SK: sk,
    GSI2PK: "COMMENT",
    GSI2SK: sk,
    name: user.name,
    email: user.email,
    image: user.image,
    text,
    created: new Date().toISOString(),
  }

  if (respondingToComment) {
    Item.respondingToComment = respondingToComment

    let UpdateRespondingTo = {
      Key: {
        pk,
        sk: "COMMENT#" + respondingToComment.id
      },
      // UpdateExpression: 'set #replies = list_append(if_not_exists(#replies, :empty_list), :reply)',
      // ExpressionAttributeNames: {
      //   '#replies': 'replies'
      // },
      // ExpressionAttributeValues: {
      //   ':reply': [Item],
      //   ':empty_list': []
      // }

      UpdateExpression: "SET #responseCount = if_not_exists (#responseCount, :init) + :inc",
      ExpressionAttributeNames: {
        '#responseCount': 'responseCount'
      },
      ExpressionAttributeValues: {
        ":init": 0,
        ":inc": 1
      }
    }

    const data = await mainTable.updateItem(UpdateRespondingTo)

  }

  await mainTable.putItem(Item)
  await updateUserCommentCount(user)
  await updatePostCommentCount(entitySlug)

  return mapComment(Item)
}

export async function getComments({ slug, user }) {
  console.log("getting comments", slug, user)
  if (slug) {
    const { Items } = await mainTable.queryItems({
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :comment)",
      ExpressionAttributeValues: {
        ":pk": "ENTITY#" + slug,
        ":comment": `COMMENT`
      },
    })
    return Items.map(mapComment)
  }
  if (user) {
    console.log("getting comments for user", user.email)
    const { Items } = await mainTable.queryItems({
      KeyConditionExpression: "GSI1PK = :pk AND begins_with(GSI1SK, :comment)",
      ExpressionAttributeValues: {
        ":pk": "USER#" + user.email,
        ":comment": `COMMENT`
      },
      IndexName: "GSI1",
      ScanIndexForward: false,
    })
    return Items.map(item => mapComment({
      ...item,
      post: item.pk.replace("ENTITY#", "")
    }))
  }
}

export async function getPost(slug) {
  const data = await postsTable.queryItem({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#${slug}`
    }
  })
  if (!data.Item) {

    return null
  }
  return mapPost(entityDetails(data.Item))
}


export async function getPlaylist({ slug }) {
  const playlist = await getPost(slug)
  const children = await getPlaylistChildren({ slug })
  const mapChild = child => {
    if (child.section) {
      return {
        ...child,
        children: child.children.map(mapChild)
      }
    }
    return children.find(c => c.slug === child)
  }
  playlist.children = playlist.children.map(mapChild)
  return playlist
}

export async function getPlaylistChildren({ slug }) {

  const { Items } = await postsTable.queryItems({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "PLAYLIST#" + slug
    },
  })

  return Items.map(entityDetails).map(mapPost)
}


async function getEntities({ type, lastEvaluatedKey, limit = 30 }) {
  const params = {
    ProjectionExpression: "dirPath, imagesPath, indexPath, slug, tags, image, #tp, href, title, description, #dt, children, redirectTo",
    ExpressionAttributeNames: { "#tp": "type", "#dt": "date" },
    KeyConditionExpression: "GSI1PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#${type}`
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
  const { Items, ScannedCount, LastEvaluatedKey } = await postsTable.queryItems(params)

  const nextKey = LastEvaluatedKey ? jwt.sign(LastEvaluatedKey, process.env.REQUEST_SECRET) : null
  return { posts: Items.map(entityDetails).map(mapPost), count: ScannedCount, lastEvaluatedKey: nextKey }
}

export async function getPosts({ lastEvaluatedKey, limit = 30 } = {}) {
  return getEntities({ type: "POST", lastEvaluatedKey, limit })
}

export async function getPlaylists({ lastEvaluatedKey, limit = 30 } = {}) {
  return getEntities({ type: "PLAYLIST", lastEvaluatedKey, limit })
}

export async function getAllPosts({ ProjectionExpression, ExpressionAttributeNames }) {
  const params = {
    ProjectionExpression,
    ExpressionAttributeNames,
    KeyConditionExpression: "GSI1PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#POST`
    },
    IndexName: "GSI1",
    ScanIndexForward: false,
  }

  const { Items } = await postsTable.queryItems(params)

  console.log("get all posts")
  return Items.map(sanitizeDynamoObject)
}

export async function getPostPlaylists({ slug }) {
  const { Items } = await postsTable.queryItems({
    ProjectionExpression: "playlist",
    KeyConditionExpression: "sk = :pk AND begins_with(pk, :sk)",
    ExpressionAttributeValues: {
      ":pk": `ENTITY#${slug}`,
      ":sk": "PLAYLIST"
    },
    IndexName: "INVERTED_INDEX",
  })
  return Items.map(i => ({ ...i.playlist, type: 'playlist' })).map(entityDetails)
}

export async function getFeaturedPosts() {
  const { Items } = await postsTable.queryItems({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": "SETTING#featured",
      ":sk": "SETTING"
    },
  })

  return Items.map(entityDetails).map(mapFeatured)
}

export async function getMostRecentVideo() {
  const { Item } = await postsTable.getItem({
    Key: {
      pk: "SETTING#most-recent-video",
      sk: "SETTING#most-recent-video"
    }
  })
  return mapPost(entityDetails(Item))
}

export async function admin_getAllComments() {
  const { Items } = await mainTable.queryItems({
    KeyConditionExpression: "GSI2PK = :pk AND begins_with(GSI2SK, :comment)",
    ExpressionAttributeValues: {
      ":pk": "COMMENT",
      ":comment": `COMMENT`
    },
    IndexName: "GSI2",
    ScanIndexForward: false,
  })

  return Items.map(item => mapComment({
    ...item,
    post: item.pk.replace("ENTITY#", "")
  }))
}