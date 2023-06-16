import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '../../../utils/database'
import User from '../user/schema'
import { authorize, signIn } from 'next-auth/react'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async signIn(credentials) {
        const { email, password } = credentials

        // Conecte-se ao banco de dados
        await connectDB()

        // Faça uma consulta para verificar as credenciais do usuário
        const user = await User.findOne({ email })

        if (user) {
          // Retorna um objeto contendo as informações do usuário
          return { id: user._id, email: user.email }
        }

        // Retorna null se as credenciais forem inválidas
        return null
      }
    })
  ]
})
