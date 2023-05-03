import databaseConnection from '../src/utils/database'
import User from '../src/models/user'

import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    throw new Error('Token inválido')
  }
}

export function verifica(token) {
  return readToken(token)
}

export async function cadastroUser(body) {
  await databaseConnection()
  const user = await User.find({ email: body.email })
  if (user.length !== 0) throw new Error('Usuário já cadastrado')
  const newUser = new User(body)
  User.create(newUser, body)

  const token = createToken(body)
  return body, token
}

export async function loginUser(body) {
  await databaseConnection()
  const user = await User.find({ email: body.email })
  if (user.length === 0) throw new Error('Usuário não encontrado')
  if (user[0].password !== body.password) throw new Error('Senha incorreta')

  const token = createToken(user)
  return token, user
}
