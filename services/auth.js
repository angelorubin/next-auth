import databaseConnection from '../src/utils/database'
import User from '../src/models/user'
import bcrypt from 'bcryptjs'
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

export async function retrieveUser(email) {
  await databaseConnection()
  const user = await User.find({ email })
  return user
}

export async function auth(email, password) {
  await databaseConnection()

  try {
    const user = await User.findOne({ email, password })

    if (!user) {
      return { message: 'Email ou senha inválidos.' }
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id }, SECRET, {
      expiresIn: '1h'
    })

    return { token }
  } catch (error) {
    return error.message
  }
}
