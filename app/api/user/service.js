import connectDB from '@/utils/database'
import User from './schema'
import bcrypt from 'bcrypt'

connectDB()

export async function userCreate(user) {
  const { name, email, password } = user

  const hashedPassword = await bcrypt.hash(password, 10)

  const userData = { name, email, password: hashedPassword }

  const newUser = new User(userData)

  const { name: userName, email: userEmail } = await User.create(newUser)

  if (email) {
    return {
      message: 'Usuário registrado com sucesso.',
      name: userName,
      email: userEmail
    }
  } else {
    return {
      message: 'Ocorreu um erro, o usuário não foi registrado.'
    }
  }
}

export async function usersRetrieve() {
  return await User.find({})
}

export async function getUserByEmail(email) {
  return await User.findOne({ email })
}

export async function userRetrieveById(id) {
  return await User.findOne({ _id: id })
}
