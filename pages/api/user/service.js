import database from '../../../utils/database'
import User from './schema'
import bcrypt from 'bcryptjs'

database()

export async function userCreate(user) {
  const { name, email, password } = user
  // const user = await User.find({ email: body.email })

  const saltRounds = 10

  const hashedPassword = await bcrypt.hash(password, saltRounds)

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

export async function userRetrieve() {
  return await User.find({})
}
