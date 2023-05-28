import jwt from 'jsonwebtoken'
import { auth, verifyToken } from './service'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body
      const token = await auth(email, password)
      res.json({ token })
    } catch (error) {
      throw new Error(error)
    }
  }
  /**
  else if (req.method === 'POST' && token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)

      // Continue com a lógica do seu handler
      // A partir daqui, você pode usar o decodedToken para obter informações do usuário, por exemplo.
      res.json({ message: 'Token validado com sucesso.', decodedToken })
    } catch (error) {
      // Lida com o caso em que o token é inválido ou expirou
      res.status(401).json({ message: 'Token inválido' })
    }
  }
  */
}
