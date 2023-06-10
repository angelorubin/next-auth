import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Link from 'next/link'
import { setCookie } from 'nookies'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

export default function Auth() {
  const router = useRouter()

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const { token } = await res.json()

        if (res.status === 200) {
          setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          })
          router.push('/dashboard')
        }

        if (res.status === 401) {
          toast('Acesso não autorizado, credenciais inválidas', {
            position: 'top-center',
            hideProgressBar: true,
            closeButton: false,
            type: 'error',
            theme: 'colored'
          })
        }
      } catch (error) {
        toast('Acesso não autorizado, credenciais inválidas', {
          position: 'top-center',
          hideProgressBar: true,
          closeButton: false,
          type: 'error',
          theme: 'colored'
        })
        resetForm()
      }
    }
  })

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ToastContainer />
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
    </div>
  )
}
