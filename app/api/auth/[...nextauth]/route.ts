import NextAuth, { type NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import {getUserByEmail} from '../../user/service'
import connectDB from '@/utils/database'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'

connectDB()

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'E-mail', type:'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await getUserByEmail(email);
        
        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return null;
        }
        
        return { email: user.email, id: user._id };
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
