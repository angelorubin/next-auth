import { userCreate, userRetrieve } from './service'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body: userData } = req
    const createdUser = await userCreate(userData)
    return res.json({ ...createdUser })
    try {
    } catch (error) {
      res.json({ message: error.message })
    }
  }
  if (req.method === 'GET') {
    const users = await userRetrieve()
    res.json({ ...users })
  }
}
