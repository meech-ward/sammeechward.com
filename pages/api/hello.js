// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { authOptions } from './auth/[...nextauth]'
import { getUser } from "../../server/dynamo/queries"

import { unstable_getServerSession } from "next-auth/next"


export default async function handler(req, res) {
  // next next auth user

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { email } = session.user

  const user = await getUser({ email })


  // createUser("sam")
  res.status(200).json({ session: session.user, user })
}
