'use client'
import Link from 'next/link'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

import axios from 'axios'

export default function User() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value })
  }

  const handleForm = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post('/api/register', { ...formData })

      if (response.status !== 201) {
        throw new Error(res.data.message)
        // setCookie('authorization', json)
        // router.push('/login')
      }
      console.log(res.data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col">
        <h3 className="font-roboto text-2xl font-bold tracking-wide">Crie sua conta</h3>
        <form onSubmit={handleForm} className="flex flex-col gap-2">
          <input
            className="p-2 bg-gray-100"
            type="text"
            placeholder="nome"
            required
            value={formData.name}
            onChange={(e) => {
              handleFormEdit(e, 'name')
            }}
          />
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
          <button className="bg-gray-500 text-white p-2">Cadastrar</button>
          {error && <p className="">{error}</p>}
          <a href="/auth">Já possui conta?</a>
        </form>
      </div>
    </div>
  )
}
