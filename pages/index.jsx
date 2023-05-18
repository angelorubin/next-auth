import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth') // Redirecionar para auth
  }, [])

  return null // Ou você pode retornar um componente de carregamento ou uma mensagem, se desejar
}
