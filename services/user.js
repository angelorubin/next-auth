import databaseConnection from '../utils/database'
import User from '../models/user'

export async function cadastroUser(body) {
  await databaseConnection()
  const user = await User.find({ email: body.email })
  if (user.length !== 0) throw new Error('Usuário já cadastrado')
  const newUser = new User(body)
  User.create(newUser)
  return body
}

export async function loginUser(body) {
  await databaseConnection()
  const user = await User.find({ email: body.email })
  if (user.length === 0) throw new Error('Usuário não encontrado')
  if (user[0].password !== body.password) throw new Error('Senha incorreta')

  return user
}
