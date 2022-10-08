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
  if (!session) {
    return {}
  }
  const user = await getUser({email: session.user.email})
  return {user, session}
}

// Get the current session and user, only if admin user
export async function getAdminSessionAndUser(req, res) {
  const {user, session} = await getSessionAndUser(req, res)

  if (user?.role !== "admin") {
    return {}
  }

  return {user, session}
}

  