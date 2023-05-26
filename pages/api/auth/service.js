import database from '../../../utils/database'
import User from '../../../models/user'
import jwt from 'jsonwebtoken'

export async function auth(email, password) {
  await database()
  try {
    const user = await User.findOne({ email, password })

    if (!user) {
      return { message: 'Email ou senha inválidos.' }
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return { token }
  } catch (error) {
    return error.message
  }
}

export async function readToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}

export async function verifyToken(token) {
  return readToken(token)
}
