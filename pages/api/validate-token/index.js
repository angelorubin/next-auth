import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET)

      res.status(200).json({ message: 'Token validado com sucesso.', decodedToken })
    } catch (error) {
      // Lida com o caso em que o token é inválido ou expirou
      res.status(401).json({ message: 'Token inválido' })
    }
  }
}
