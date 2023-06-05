import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AiOutlineLogout } from 'react-icons/ai'
import fetch from 'isomorphic-fetch'

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
    const response = await fetch('http://localhost:3000/api/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // Adicione o corpo da requisição se necessário
      // body: JSON.stringify({}),
    })

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      const data = await response.json()

      // Retorna os dados para serem utilizados na página
      return {
        props: {
          data
        }
      }
    } else {
      // Lida com erros de autenticação ou outras falhas na requisição
      console.error('Erro na requisição:', response.status)
      // Retorna a resposta normalmente, por exemplo, para exibir uma mensagem de erro na página
      return {
        props: {
          error: 'Erro na requisição.'
        }
      }
    }
  } catch (error) {
    // Lida com erros de conexão ou outros erros na requisição
    console.error('Erro na requisição:', error)
    // Retorna a resposta normalmente, por exemplo, para exibir uma mensagem de erro na página
    return {
      props: {
        error: 'Erro na requisição.'
      }
    }
  }
}

export default function Dashboard(props) {
  const { data, error } = props
  const router = useRouter()

  const handleLogout = (e) => {
    destroyCookie(null, 'token', { path: '/' })
    router.push('/auth')
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex h-20 w-full bg-gray-300">
        <div className="flex flex-1 items-center">
          <span className="text-2xl font-bold m-2">Next</span>
          <span className="text-2xl">Auth</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-2">
            <h1 className="flex justify-end">
              Hello, <span className="font-bold mr-0.5">{data.user.name}</span>, welcome!
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
