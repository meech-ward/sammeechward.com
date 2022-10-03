// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSessionAndUser } from "../../../server/user"

import { createComment } from "../../../server/dynamo/queries"

import _ from "lodash"

async function post(req, res) {
  const {session, user} = await getSessionAndUser(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { articleId, text } = req.body
  if (!articleId || !text) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  const comment = await createComment({articleId, text: _.escape(text), user})

  res.status(201).json({ comment })
}

async function get(req, res) {
  console.log(req.query)
  console.log(req.params)
  const { articleId } = req.query
  if (!articleId) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  const comments = await getComments(articleId)

  res.status(200).json({ comments })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
    case "POST":
      return await post(req, res)
  }
  
  res.status(404).end()
}
