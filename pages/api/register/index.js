import { userRegistration } from './service'
import { schemaValidation } from './validation'
import User from '@/pages/api/user/schema'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const dataValidation = schemaValidation.parse(req.body)

      const { email } = dataValidation

      const userEmail = await User.findOne({ email })
      if (userEmail) {
        return res.status(400).json({ statusCode: 400, error: 'Usuário já cadastrado' })
      }

      if (dataValidation) {
        const { _id: id, name, email } = await userRegistration(req.body)
        res.status(201).json({
          createdUser: { id, name, email }
        })
      }
    } catch (error) {
      res.status(400).json({ message: 'Erro de validação', error: error.errors })
    }
  }
}