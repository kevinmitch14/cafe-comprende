import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: '337f284904a2a8c4d9b3',
            clientSecret: '75944dd5d97d191bba48eb72a35e13d3e5306ebc',
        }),
        // ...add more providers here
    ],
})