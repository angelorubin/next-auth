import jwt from 'jsonwebtoken'
import User from '@/pages/api/user/schema'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization.split(' ')[1]

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      const id = decodedToken.userId

      const { _id, name, email } = await User.findOne({ _id: id })

      res.status(200).json({
        message: 'Token validado com sucesso.',
        user: { _id, name, email }
      })
    } catch (error) {
      // Lida com o caso em que o token é inválido ou expirou
      res.status(401).json({ message: 'Token inválido' })
    }
  }
}
