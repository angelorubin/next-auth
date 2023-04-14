import databaseConnection from '../utils/database'
import User from '../models/user'

export async function cadastroUser(body) {
  await databaseConnection()
  const user = await User.find(({ email }) => email === body.email)
  if (user) throw new Error('Usuário já cadastrado')

  User.push(body)
  return body
}

export async function loginUser(body) {
  await databaseConnection()
  const user = User.find(({ email }) => email === body.email)
  if (!user) throw new Error('Usuário não encontrado')
  if (user.password !== body.password) throw new Error('Senha incorreta')

  return user
}
