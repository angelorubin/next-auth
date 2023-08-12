import User from '../user/schema'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connectDB from '@/utils/database'
import NextAuth from 'next-auth'

connectDB()

export async function authentication(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Credenciais inválidas')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas')
  }

  const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  return token
}

export async function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'Admin', email: 'admin@admin.com' }
        return user
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
