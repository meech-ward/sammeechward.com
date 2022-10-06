// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSessionAndUser } from "../../../server/user"

import { getPosts } from "../../../server/dynamo/queries"

import _ from "lodash"

async function post(req, res) {
  const {session, user} = await getSessionAndUser(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  res.status(201).json({ message: "" })
}

async function get(req, res) {
  const { lastEvaluatedKey, limit } = req.query
  
  const result = await getPosts(lastEvaluatedKey, +limit ?? 30)

  res.status(200).json(result)
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
