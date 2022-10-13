// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSessionAndUser } from "../../../server/user"

import { getPost } from "../../../server/dynamo/queries"

import _ from "lodash"

async function get(req, res) {
  const slug = req.query.slug
  
  const result = await getPost(slug)

  res.status(200).json({post: result})
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
  }
  
  res.status(404).end()
}
