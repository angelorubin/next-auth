import User from '../user/schema'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connectDB from '../../../utils/database'

connectDB()

export async function authentication(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Credenciais inválidas')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas')
  }

  const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  return token
}

export async function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}
