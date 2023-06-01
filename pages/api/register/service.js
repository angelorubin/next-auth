import database from '../../../utils/database'
import User from '../user/schema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

database()

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET)
}

export async function userRegistration(body) {
  const { name, email, password } = body

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

  /**
  // Hash password
  return bcrypt.hash(body.password, saltRounds, (err, hash) => {
    if (err) {
      // Lida com o erro
      throw new Error(err.message)
    }
    const userData = { name: body.name, email: body.email, password: hash }
    const newUser = new User(userData)
    User.create(newUser)

    const token = createToken(userData)
    return { userData }
  })
  */
}
