// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAdminSessionAndUser } from "../../../../server/user"

import { admin_getAllComments } from "../../../../server/dynamo/queries"

import _ from "lodash"


async function get(req, res) {
  const { user, session } = await getAdminSessionAndUser(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const comments = await admin_getAllComments()

  res.status(200).json({ comments })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
  }
  
  res.status(404).end()
}
