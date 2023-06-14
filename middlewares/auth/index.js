import jwt from 'jsonwebtoken'
import { withAuth } from 'next-auth/middleware'

export function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
      const splittedToken = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(splittedToken, process.env.JWT_SECRET)

      req.userInfo = decoded

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }
  }
}

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export function withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === '/admin') {
        return token?.userRole === 'admin'
      }
      // `/me` only requires the user to be logged in
      return !!token
    }
  }
})

export const config = { matcher: ['/admin', '/me'] }
