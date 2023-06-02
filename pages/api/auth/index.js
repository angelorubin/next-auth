import { userAuthentication } from './service'

export default async function handler(req, res) {
  const { email, password } = req.body

  if (req.method === 'POST') {
    try {
      const response = await userAuthentication(email, password)
      if (response) {
        res.status(200).json({ token: response })
      } else {
        res.status(401).json({ message: 'Acesso não autorizado, credenciais inválidas.' })
      }
    } catch (error) {
      res.status(401).json({ message: 'Acesso não autorizado, credenciais inválidas.' })
    }
  }
}
