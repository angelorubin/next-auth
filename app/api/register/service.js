import connectDB from '@/utils/database'
import User from '@/pages/api/user/schema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDB()

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET)
}

export async function userRegistration({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const userData = { name, email, password: hashedPassword }

  const newUser = new User(userData)

  const createdUser = await User.create(newUser)

  return createdUser
}
