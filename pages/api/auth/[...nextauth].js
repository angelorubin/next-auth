import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '../user/schema'
import connectDB from '../../../utils/database'

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

        // Connect to your existing database
        connectDB()

        // Retrieve the user from your existing database
        const user = await User.findOne({ email })

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (user && passwordMatch) {
          // Return the user object if the password is correct
          return Promise.resolve(user)
        } else {
          // Return null if the username or password is incorrect
          return Promise.resolve(null)
        }
      }
    })
  ]
})
