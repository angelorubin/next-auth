import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Link from 'next/link'
import { setCookie } from 'nookies'
import * as Yup from 'yup'

export default function Auth() {
  const router = useRouter()
  const [error, setError] = useState({ status: false, message: '' })

  const authFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        // Fazer a chamada HTTP usando o Axios
        const res = await axios.post('/api/auth', values)

        const { token } = res.data

        if (token) {
          setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60, // Expiration time in seconds (e.g., 30 days)
            path: '/' // The path where the cookie is accessible (e.g., '/' for the entire domain)
          })
          router.push('/dashboard')
        }
      } catch (error) {
        // Lógica de tratamento de erros
        console.error(error)
      }
    }
  })

  /**
  async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/auth', { ...formData })
    const { token } = res.data

    try {
      if (token) {
        setCookie(null, 'token', token, {
          maxAge: 30 * 24 * 60 * 60, // Expiration time in seconds (e.g., 30 days)
          path: '/' // The path where the cookie is accessible (e.g., '/' for the entire domain)
        })
        router.push('/dashboard')
      } else {
        setError({ status: true, message: res.message || '' })
      }
    } catch (err) {
      setError({ status: true, message: err.message || '' })
    }
  }
  */

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col">
        <h3 className="font-roboto text-2xl font-bold tracking-wide">Next Auth</h3>
        <form onSubmit={authFormik.handleSubmit} className="flex flex-col gap-3">
          <input
            id="email"
            name="email"
            className="p-2 bg-gray-100"
            type="email"
            placeholder="e-mail"
            value={authFormik.values.email}
            onChange={authFormik.handleChange}
            onBlur={authFormik.handleBlur}
          />
          {authFormik.touched.email && authFormik.errors.email ? (
            <span className="text-red-500">{authFormik.errors.email}</span>
          ) : null}
          <input
            id="password"
            name="password"
            className="p-2 bg-gray-100"
            type="password"
            placeholder="senha"
            value={authFormik.values.password}
            onChange={authFormik.handleChange}
            onBlur={authFormik.handleBlur}
          />
          {authFormik.touched.password && authFormik.errors.password ? (
            <span className="text-red-500">{authFormik.errors.password}</span>
          ) : null}
          <button type="submit" className="p-2 bg-gray-500 text-white">
            Entrar
          </button>
        </form>
        <Link href={{ pathname: '/dashboard' }}>Ainda não possui conta?</Link>
      </div>
    </div>
  )
}
