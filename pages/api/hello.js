// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { authOptions } from './auth/[...nextauth]'
import { createUser } from "../../server/dynamo/queries"

import { unstable_getServerSession } from "next-auth/next"


export default async function handler(req, res) {
  // next next auth user

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { username } = session.user


  // createUser("sam")
  res.status(200).json({ user: session.user })
}
