import { parseCookies } from 'nookies'

export async function getServerSideProps(context) {
  try {
    // Obtém os cookies da requisição
    const cookies = parseCookies(context)

    // Obtém o token do cookie ou define como vazio caso não exista
    const token = cookies.token || ''

    if (!token) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false // Defina como true se o redirecionamento for permanente
        }
      }
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const res = await fetch('http://localhost:3000/api/validate-token', {
      headers,
      method: 'POST'
    })

    const data = await res.json()

    if (res.status === 200) {
      return {
        props: {
          user: data.user
        }
      }
    }

    /**
    const response = await axios.post('/validate-token', { token })

    if (response.status === 200) {
      return {
        props: {
          data
        }
      }
    }
    */
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

export default function Dashboard({ user }) {
  const { name } = user
  return (
    <>
      <h1>
        Hello, <span className="font-bold">{name}</span>, welcome to dashboard!!!
      </h1>
    </>
  )
}
