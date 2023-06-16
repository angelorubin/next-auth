import { auth } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const result = await auth('credentials', {
        redirect: false,
        email,
        password
      })

      if (result.error) {
        res.status(401).json({ error: result.error })
      }
    } catch (error) {
      res.json({ error })
    }
  }
}
