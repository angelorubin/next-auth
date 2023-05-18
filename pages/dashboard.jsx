import { parseCookies } from 'nookies'
import { verifica } from '../services/auth'

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)

  // Simulação de autenticação
  const isAuthenticated = await verifica(cookies.token) // Verifica se o token é válido

  // Se o usuário não estiver autenticado, faça o redirecionamento
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth', // Página de autenticação
        permanent: false // Redirecionamento temporário
      }
    }
  }

  // Se o usuário estiver autenticado, continue com o fluxo normal

  return {
    props: {}
  }
}

export default function Dashboard() {
  return <h1>Seja bem vindo !</h1>
}
