// pages/api/newsletter/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next"

import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

import { sql } from "drizzle-orm"
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

import { headers } from "next/headers"
import { randomUUID } from "crypto"

type Data = {
  message: string
}

const subscribers = sqliteTable("subscribers", {
  id: text("id"),
  email: text("email").notNull(),
  subscribed: integer("subscribed", { mode: "boolean" }).notNull().default(true),
  ipAddress: text("ip_address"),
  country: text("country"),
  region: text("region"),
  city: text("city"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  subscribedFrom: text("subscribed_from").notNull(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { email } = req.body

    // Validate email
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" })
    }

    // Here you would typically:
    // 1. Validate the email isn't already in your database
    // 2. Add the email to your newsletter service (e.g., Mailchimp, SendGrid, etc.)
    // 3. Store the email in your database if needed

    await storeEmail(email, req)

    // For this example, we'll just simulate a successful signup
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    // Set cookie using Next.js built-in functionality
    res.setHeader("Set-Cookie", `newsletter_signup=true; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`)

    return res.status(200).json({ message: "Successfully subscribed to newsletter" })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export async function storeEmail(email: string, req: NextApiRequest): Promise<{ error?: string; success?: string }> {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  })

  const db = drizzle(client)

  const ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"]
  const country = req.headers["x-vercel-ip-country"]
  const region = req.headers["x-vercel-ip-country-region"]
  const city = req.headers["x-vercel-ip-city"]
  const result = await db.insert(subscribers).values({
    // @ts-ignore
    id: randomUUID(),
    email,
    ipAddress: ip,
    country,
    region,
    city,
    subscribedFrom: "sam-meech-ward",
  })

  // const result = await db.select().from(subscribers).limit(1)

  console.log(result)

  return { success: "success" }
}
