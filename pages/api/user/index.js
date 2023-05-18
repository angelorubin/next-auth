import { userCreate, retrieveUser } from '../../../services/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newUser = userCreate(req.body)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json(err.message)
    }
  } else if (req.method === 'GET') {
    try {
      const users = await retrieveUser(req.body.email)
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
