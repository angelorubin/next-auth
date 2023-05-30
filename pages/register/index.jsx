import { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

export default function User() {
  const [error, setError] = useState('')
  const [snackbar, setSnackbar] = useState(false)
  const router = useRouter()

  const formRegistration = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('campo obrigatório'),
      email: Yup.string()
        .email('O campo email deve ser um email válido.')
        .required('campo obrigatório'),
      password: Yup.string().required('campo obrigatório')
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values
      try {
        const res = await axios.post('/api/register', { name, email, password })

        if (res.status === 201) {
          setError(res.data.message)
          setSnackbar(true)
          // router.push('/dashboard')
        }
        setError(true)
      } catch (err) {
        setError(err.message)
      }
    }
  })

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col">
        <h3 className="font-roboto text-2xl font-bold tracking-wide">Crie sua conta</h3>
        <form onSubmit={formRegistration.handleSubmit} className="flex flex-col gap-2">
          <input
            id="name"
            name="name"
            className="p-2 bg-gray-100"
            type="text"
            placeholder="nome"
            required
            value={formRegistration.values.name}
            onBlur={formRegistration.handleBlur}
            onChange={formRegistration.handleChange}
          />
          {formRegistration.touched.name && formRegistration.errors.name ? (
            <span className="text-red-500 text-xs">{formRegistration.errors.name}</span>
          ) : null}
          <input
            id="email"
            name="email"
            className="p-2 bg-gray-100"
            type="text"
            placeholder="email"
            required
            value={formRegistration.values.email}
            onBlur={formRegistration.handleBlur}
            onChange={formRegistration.handleChange}
          />
          {formRegistration.touched.email && formRegistration.errors.email ? (
            <span className="text-red-500 text-xs">{formRegistration.errors.email}</span>
          ) : null}
          <input
            id="password"
            name="password"
            className="p-2 bg-gray-100"
            type="password"
            placeholder="senha"
            required
            value={formRegistration.values.password}
            onBlur={formRegistration.handleBlur}
            onChange={formRegistration.handleChange}
          />
          {formRegistration.touched.password && formRegistration.errors.password ? (
            <span className="text-red-500 text-xs">{formRegistration.errors.password}</span>
          ) : null}
          <button className="bg-gray-500 text-white p-2" type="submit">
            cadastrar
          </button>
          <a href="/auth">Já possui conta?</a>
        </form>
      </div>
    </div>
  )
}
