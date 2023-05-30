import { auth } from './service'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body
      const token = await auth(email, password)

      if (token) {
        res.json({ token })
      } else {
        res.json({ message: 'Dados de autenticação inválidos' })
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
