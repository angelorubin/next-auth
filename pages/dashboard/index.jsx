import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AiOutlineLogout } from 'react-icons/ai'

export async function validateToken(token) {
  const res = await fetch(`/api/validate-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })

  const jsonData = res.json()
  return jsonData
}

export async function getServerSideProps(context) {
  try {
    const { req } = context
    const cookies = parseCookies({ req })

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies.token}` }
    })

    const jsonData = await res.json()

    return {
      props: {
        data: jsonData
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_URL}/auth`
      }
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
  const { user } = data
  const { name } = user

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
              <span className="font-bold"> {name} </span>
              <span className="">, welcome!</span>
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
