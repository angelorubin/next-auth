import { signIn } from 'next-auth/client'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const result = await signIn('credentials', {
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
