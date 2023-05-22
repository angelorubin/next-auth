import { auth } from '../../app/services/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const user = await auth(email, password)
    return res.json(user)
  }
}
