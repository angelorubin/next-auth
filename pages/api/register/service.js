import database from '../../../utils/database'
import User from '../user/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

database()

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET)
}

export async function userRegistration(body) {
  const { name, email, password } = body
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
