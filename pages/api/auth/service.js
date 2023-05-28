import User from '../user/schema'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connectDB from '../../../utils/database'

connectDB()

export async function auth(email, password) {
  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }

    // Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return token
  } catch (error) {
    return error.message
  }
}

export async function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}
