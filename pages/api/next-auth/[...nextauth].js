import NextAuth from 'next-auth'
import connectDB from '../../../utils/database'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../user/schema'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials

        // Conecte-se ao banco de dados
        await connectDB()

        // Faça uma consulta para verificar as credenciais do usuário
        const user = await User.findOne({ email })

        if (user && user.password === password) {
          // Retorna um objeto contendo as informações do usuário
          return { id: user._id, email: user.email }
        }

        // Retorna null se as credenciais forem inválidas
        return null
      }
    })
  ],
  pages: {
    signin: '/auth', // Rota para a página de login
    signOut: '/logout', // Rota para a página de logout
    error: '/login' // Rota para a página de erro de autenticação
  }
})
