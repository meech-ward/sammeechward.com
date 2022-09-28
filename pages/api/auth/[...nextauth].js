import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

// https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
})