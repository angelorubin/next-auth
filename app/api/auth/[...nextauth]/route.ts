import NextAuth, { type NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import User from '../../user/schema'
import connectDB from '@/utils/database'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: { password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        if (credentials.password !== 'pw') return null
        return {
          name: 'Fill Murray',
          email: 'bill@fillmurray.com',
          image: 'https://www.fillmurray.com/64/64',
          id: '1',
          foo: ''
        }
      }
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

/*
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await connectDB()

        //Check if the user exists.
        try {
          const user = await User.findOne({
            email: credentials.email
          })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error('Wrong Credentials!')
            }
          } else {
            throw new Error('User not found!')
          }
        } catch (err) {
          throw new Error(err)
        }
      }
    })
  ],
  pages: {
    error: '/auth'
  }
})
*/

// export { handler as GET, handler as POST }
