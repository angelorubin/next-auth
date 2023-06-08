import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth') // Substitua '/outra-rota' pela rota para a qual deseja redirecionar
  }, [])

  return null // Pode retornar null ou qualquer conteúdo que desejar para exibir brevemente na página antes do redirecionamento
}

export default HomePage
