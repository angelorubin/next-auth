import jwt from 'jsonwebtoken'

export default function authMiddleware(handler) {
  return async (req, res) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token de autenticação não fornecido' })
      return
    }

    const token = authorization.split(' ')[1]

    try {
      const decoded = jwt.verify(token, 'sua_chave_secreta_aqui')

      // Você pode acessar as informações do usuário contidas no token usando decoded.userId, decoded.username, etc.

      // Chame o handler original da rota protegida
      return await handler(req, res)
    } catch (error) {
      res.status(401).json({ message: 'Token de autenticação inválido' })
    }
  }
}
