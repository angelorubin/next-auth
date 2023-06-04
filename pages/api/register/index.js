import { userRegistration } from './service'
import { schemaValidation } from './validation'
import User from '../user/schema'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const validatedData = schemaValidation.parse(req.body)

      const { email } = validatedData

      const userEmail = await User.findOne({ email })
      if (userEmail) {
        return res.status(400).json({ statusCode: 400, error: 'Esse usuário já está cadastrado' })
      }

      if (validatedData) {
        const { _id: id, name, email } = await userRegistration(req.body)
        res.status(201).json({
          createdUser: { id, name, email }
        })
      }
    } catch (error) {
      res.status(400).json({ message: 'Erro de validação', error: error.errors })
    }
  }

  /**
  if (req.method === 'POST') {
    try {
      const data = await userRegistration(JSON.parse(body))

      res.status(201).json({
        ...data
      })
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro ao processar a requisição.'
      })
    }
  }
  */
}

/**
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body)
      const newUser = userCreate(req.body)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json(err.message)
    }
  } else if (req.method === 'GET') {
    try {
      console.log(req.body)
      const user = await userRetrieve(req.body)
      res.status(200).json({ user })
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
*/
