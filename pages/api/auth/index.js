import { signIn } from 'next-auth/react'

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

      console.log(result)

      res.json({ result })
    } catch (error) {
      res.json({ error })
    }
  }
}
