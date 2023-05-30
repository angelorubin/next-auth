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
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return token
  } catch (error) {
    return error.message
  }
}

export async function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}
