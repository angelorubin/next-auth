'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Main = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth')
  }, [])

  return null
}

export default Main
