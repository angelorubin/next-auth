import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AiOutlineLogout } from 'react-icons/ai'
import { api } from '../../utils/api'

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.token // Obtém o token dos cookies

  const res = await fetch('http:localhost:3000/api/validate-token', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const validatedUser = await res.json()

  if (res.status !== 200) {
    // Redireciona para a página de login ou exibe uma mensagem de erro
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {
      data: validatedUser.user || null
    }
  }

  /**
  if (!token) {
    // Redireciona para a página de login ou exibe uma mensagem de erro
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Lide com a resposta da API
    const responseData = await response.json()

    return {
      props: {
        data: responseData
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Erro na requisição.'
      }
    }
  }
  */
}

export default function Dashboard({ data }) {
  const router = useRouter()

  const handleLogout = (e) => {
    destroyCookie(null, 'token', { path: '/' })
    router.push('/auth')
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex h-20 w-full bg-gray-300">
        <div className="flex flex-1 items-center">
          <span className="text-2xl font-bold m-2">Next</span>
          <span className="text-2xl">Auth</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-2">
            <h1 className="flex justify-end">
              <span className="mr-2">Hello,</span>
              <span className="font-bold"> {data.name} </span>
              <span className="">, welcome!</span>
            </h1>
          </div>
          <div className="flex-1">
            <AiOutlineLogout className="m-5" size={'1.5rem'} onClick={handleLogout} />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-30 bg-gray-200 p-2">
        <h1 className="mb-2">Dados do usuário autenticado:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
