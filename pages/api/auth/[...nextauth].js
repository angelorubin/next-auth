import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '../user/schema'
import connectDB from '../../../utils/database'

// Connect to your existing database
connectDB()

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with Custom Provider")
      name: 'credentials',
      credentials: {
        // Map the fields from the sign-in form to the expected credentials
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials

        // Retrieve the user from your existing database
        const user = await User.findOne({ email })

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (user && passwordMatch) {
          return user
        } else {
          // Return null if the username or password is incorrect
          return null
        }
      }
    })
  ]
})
