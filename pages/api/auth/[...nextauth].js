import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import connectDB from '../../../utils/database'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials

        // Conecte-se ao banco de dados
        const db = await connectDB()

        // Faça uma consulta para verificar as credenciais do usuário
        const user = await db.collection('users').findOne({ email })

        if (user && user.password === password) {
          // Retorna um objeto contendo as informações do usuário
          return { id: user._id, email: user.email }
        }

        // Retorna null se as credenciais forem inválidas
        return null
      }
    })
  ],
  database: process.env.MONGODB_URI
})
