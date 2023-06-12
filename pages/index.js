import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Main = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth')
  }, [])

  return null
}

export default Main
