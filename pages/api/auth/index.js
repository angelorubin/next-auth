import { auth } from './service'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const token = await auth(email, password)
    if (token) {
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'Acesso não autorizado.' })
    }
  }
}
