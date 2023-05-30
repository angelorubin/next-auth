import { parseCookies } from 'nookies'
import axios from 'axios'

/**
export async function getServerSideProps(context) {
  try {
    const { req, res } = context

    // Obtém os cookies da requisição
    const cookies = parseCookies(context)

    // Obtém o token do cookie ou define como vazio caso não exista
    const token = cookies.token || ''

    const data = await axios.post('/validate-token', { token })

    if (data) {
      return {
        props: {
          data
        }
      }
    }
  } catch (error) {
    // Redirecione para uma página de erro caso ocorra um erro
    return {
      redirect: {
        destination: '/auth',
        permanent: false // Defina como true se o redirecionamento for permanente
      }
    }
  }
}
*/
export default function Dashboard() {
  return <h1>Welcome to Dashboard!!!</h1>
}
