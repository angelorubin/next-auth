import { authentication } from './service'

export default async function handler(req, res) {
  const { email, password } = req.body

  if (req.method === 'POST') {
    try {
      const token = await authentication(email, password)
      res.status(200).json({ token })
    } catch (error) {
      res.status(401).json({ message: 'Acesso não autorizado, credenciais inválidas.' })
    }
  }
}
