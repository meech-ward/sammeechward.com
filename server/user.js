import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getUser } from "./dynamo/queries"

import { unstable_getServerSession } from "next-auth/next"


// Just get the current session
export async function getSession(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  return session
}

// Get the current session and user
export async function getSessionAndUser(req, res) {
  const session = await getSession(req, res)
  const user = await getUser({email: session.user.email})
  return {user, session}
}

  