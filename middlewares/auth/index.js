import jwt from 'jsonwebtoken'

export function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
      const splittedToken = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(splittedToken, process.env.JWT_SECRET)

      req.userInfo = decoded

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }
  }
}
