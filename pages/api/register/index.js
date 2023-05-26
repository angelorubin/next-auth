import { createUser } from './service'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Lógica do serviço
      const data = await createUser(req.body)

      // Envie uma resposta de sucesso com os dados
      res.status(201).json({
        data
      })
    } catch (error) {
      // Trate o erro e envie uma resposta de erro adequada
      res.status(500).json({
        message: 'Ocorreu um erro ao processar a requisição.'
      })
    }
  }
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