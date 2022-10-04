import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"
import { dynamodb, tableName } from "../../../server/dynamo/mainTable"


// https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(dynamodb, {
    tableName,
    partitionKey: "pk",
    sortKey: "sk",
    indexName: "GSI1",
    indexPartitionKey: "GSI1PK",
    indexSortKey: "GSI1SK"
  })
}

export default NextAuth(authOptions)