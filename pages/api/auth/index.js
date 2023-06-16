<<<<<<< HEAD
import { authentication } from './service'
=======
import { signIn } from 'next-auth/react'
>>>>>>> 8d64fffe146a0d3dca63c404a910547510a56d50

export default async function handler(req, res) {
  const { email, password } = req.body

  if (req.method === 'POST') {
    try {
<<<<<<< HEAD
      const token = await authentication(email, password)
      res.status(200).json({ token })
=======
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
>>>>>>> 8d64fffe146a0d3dca63c404a910547510a56d50
    } catch (error) {
      res.status(401).json({ message: 'Acesso não autorizado, credenciais inválidas.' })
    }
  }
}
