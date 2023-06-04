import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AiOutlineLogout } from 'react-icons/ai'

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
  const router = useRouter()

  const handleLogout = (e) => {
    destroyCookie(null, 'token', { path: '/' })
    router.push('/auth')
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex h-20 w-full bg-gray-300">
        <div className="flex flex-1 items-center">
          <span className="text-2xl font-bold m-2">Next</span>{' '}
          <span className="text-2xl">Auth</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-2">
            <h1 className="flex justify-end">
              Hello, <span className="font-bold mr-0.5">{name}</span>, welcome!
            </h1>
          </div>
          <div className="flex-1">
            <AiOutlineLogout className="m-5" size={'1.5rem'} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}
