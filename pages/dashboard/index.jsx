import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AiOutlineLogout } from 'react-icons/ai'
import fetch from 'isomorphic-fetch'
import { api } from '../../utils/api'

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.token // Obtém o token dos cookies

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
    const response = await api.post('/validate-token')

    // Verifica se a requisição foi bem-sucedida
    if (response.status === 200) {
      // const data = await response.json()

      // Retorna os dados para serem utilizados na página
      return {
        props: {
          data: response.data
        }
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Erro na requisição.'
      }
    }
  }
}

export default function Dashboard(props) {
  const { data } = props
  const router = useRouter()

  const handleLogout = (e) => {
    destroyCookie(null, 'token', { path: '/' })
    router.push('/auth')
  }

  return (
    <div className="flex w-full h-screen">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="flex h-20 w-full bg-gray-300">
        <div className="flex flex-1 items-center">
          <span className="text-2xl font-bold m-2">Next</span>
          <span className="text-2xl">Auth</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-2">
            <h1 className="flex justify-end">
              Hello, <span className="font-bold mr-0.5">{'test'}</span>, welcome!
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
