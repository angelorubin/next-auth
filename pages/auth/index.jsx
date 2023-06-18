import { useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Link from 'next/link'
import { setCookie } from 'nookies'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '@/pages/components/loading'
import { http } from '@/utils/http'
import { useQuery, useMutation } from '@tanstack/react-query'
import { signIn, getProviders } from 'next-auth/react'
import Icon from '../components/icon'
import { FaGithub } from 'react-icons/fa'

export default function Auth() {
  const [authLoading, setAuthLoading] = useState(false)
  const router = useRouter()

  const mutation = useMutation((formData) => http.post('/api/auth', formData))

  const authFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('campo obrigatório'),
      password: Yup.string().required('campo obrigatório')
    }),
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values

      try {
        setAuthLoading(false)

        /**
        const {
          data,
          error,
          isError,
          isIdle,
          isLoading,
          isPaused,
          isSuccess,
          failureCount,
          failureReason,
          mutate,
          mutateAsync,
          reset,
          status
        } = await mutation.mutateAsync({ email, password })
        */

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false // Redirect manually after successful login
        })

        if (!result.ok) {
          setAuthLoading(false)
          toast('Acesso não autorizado', {
            position: 'top-center',
            hideProgressBar: true,
            closeButton: false,
            type: 'error',
            theme: 'colored',
            autoClose: 3000
          })
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        setAuthLoading(false)
        toast('Acesso não autorizado', {
          position: 'top-center',
          hideProgressBar: true,
          closeButton: false,
          type: 'error',
          theme: 'colored',
          autoClose: 3000
        })
        resetForm()
      }
    }
  })

  const handleClickGithub = async () => {
    await signIn('github')
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <ToastContainer />
      {authLoading && <Loading />}
      <div className="flex flex-col gap-4">
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
        <Link href={{ pathname: '/register' }}>Ainda não possui conta?</Link>
      </div>
      <div className="m-2 text-gray-300">ou acesse com</div>
      <div>
        <button
          className="flex flex-col items-center border rounded-lg p-1"
          onClick={handleClickGithub}
        >
          <Icon size={'2rem'}>
            <FaGithub />
          </Icon>
          <h3>github</h3>
        </button>
      </div>
    </div>
  )
}
