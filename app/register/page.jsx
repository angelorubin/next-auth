'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function User() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'O nome deve possuir 3 caracteres ou mais')
        .required('Campo obrigatório'),
      email: Yup.string().email('Deve ser um e-mail válido.').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório')
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values

      try {
        const res = await axios.post(`/api/register`, { name, email, password })

        if (res.status === 201) {
          setCookie('token', res.data.token)
          router.push('/dashboard')
        }
      } catch (err) {
        setError('Ocorreu um erro, o usuário não foi registrado.')
      }
    }
  })

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-roboto text-2xl font-bold tracking-wide">Crie sua conta</h1>
        <form onSubmit={registerForm.handleSubmit} className="flex flex-col gap-3">
          <input
            id="name"
            name="name"
            className="bg-gray-100 p-2"
            type="text"
            placeholder="nome"
            required
            value={registerForm.values.name}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />

          {registerForm.touched.name && registerForm.errors.name ? (
            <span className="text-red-500 text-xs">{registerForm.errors.name}</span>
          ) : null}
          <input
            id="email"
            name="email"
            className="bg-gray-100 p-2"
            type="text"
            placeholder="email"
            required
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.touched.email && registerForm.errors.email ? (
            <span className="text-red-500 text-xs">{registerForm.errors.email}</span>
          ) : null}
          <input
            id="password"
            name="password"
            className="bg-gray-100 p-2"
            type="password"
            placeholder="senha"
            required
            value={registerForm.password}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.touched.password && registerForm.errors.password ? (
            <span className="text-red-500 text-xs">{registerForm.errors.password}</span>
          ) : null}
          <button className="bg-gray-500 p-2 text-white" type="submit">
            Cadastrar
          </button>
          <a href="/auth">Já possui conta?</a>
        </form>
      </div>
    </div>
  )
}
