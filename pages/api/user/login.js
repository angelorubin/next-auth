import { loginUser } from '../../../services/user'

export default function handler(req, res) {
  try {
    const user = loginUser(JSON.parse(req.body))
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
