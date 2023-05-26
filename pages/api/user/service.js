import database from '../../../utils/database'
import User from '../../../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET)
}

export async function createUserService(body) {
  await database()
  const user = await User.find({ email: body.email })
  if (user.length !== 0) throw new Error('Usuário já cadastrado')

  const saltRounds = 10 // Número de saltos (salt rounds) para a geração do hash

  // Hash password
  bcrypt.hash(body.password, saltRounds, (err, hash) => {
    if (err) {
      // Lida com o erro
    } else {
      // Salva o hash no banco de dados
      // ex: user.senhaHash = hash;
      const userData = { name: body.name, email: body.email, password: hash }
      const newUser = new User(userData)
      User.create(newUser)

      const token = createToken(userData)
      return { userData }
    }
  })
}

export async function getUserByEmail(body) {
  await database()
  const user = await User.find({ email: body.email })
  return user
}
