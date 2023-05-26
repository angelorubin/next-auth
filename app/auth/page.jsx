'use client'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'

export default function Auth() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({ status: false, message: '' })

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value })
  }

  const handleForm = async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/auth', { ...formData })

    try {
      if (res.data.token) {
        // Requisição bem-sucedida
        console.log('Requisição POST realizada com sucesso')

        setCookie(null, 'token', res.data.token, {
          maxAge: 3600, // Tempo de vida do cookie em segundos
          path: '/' // Caminho do cookie (opcional)
        })

        router.push('/dashboard')
      } else {
        // Tratar erros de resposta
        setError({ status: true, message: res.data.message })
      }
    } catch (err) {
      setError({ status: true, message: err.message })
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full justify-center items-center gap-2">
        <h3 className="font-roboto text-2xl font-bold tracking-wide">Next Auth</h3>
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <input
            className="p-2 bg-gray-100"
            type="email"
            placeholder="e-mail"
            required
            value={formData.email}
            onChange={(e) => {
              handleFormEdit(e, 'email')
            }}
          />
          <input
            className="p-2 bg-gray-100"
            type="password"
            placeholder="senha"
            required
            value={formData.password}
            onChange={(e) => {
              handleFormEdit(e, 'password')
            }}
          />
          <button className="p-2 bg-gray-500 text-white">Entrar</button>
          {error.status && <p className="text-red-400">{error.message}</p>}
          <Link href="/register">Ainda não possui conta?</Link>
        </form>
      </div>
    </div>
  )
}
