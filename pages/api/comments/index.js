// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSessionAndUser } from "../../../server/user"

import { createComment, getComments } from "../../../server/dynamo/queries"

import _ from "lodash"

async function post(req, res) {
  const {session, user} = await getSessionAndUser(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { entitySlug, text, respondingToComment } = req.body
  if (!entitySlug || !text) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  const comment = await createComment({entitySlug, text: _.escape(text), user, respondingToComment})

  res.status(201).json({ comment })
}

async function get(req, res) {
  const { post } = req.query
  if (!post) {  
    res.status(404).json({ error: "No post id" })
    return
  }

  const comments = await getComments({slug: post})

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
