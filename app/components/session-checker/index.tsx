'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading'

export default function SessionChecker({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Se não houver sessão, redirecione para a página de login
  if (!session) {
    router.push('/auth')
  }

  // Se houver uma sessão, renderize o conteúdo protegido
  return children
}
