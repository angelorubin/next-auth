import { getServerSession } from 'next-auth/next'
// import { authOptions } from './api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { AiOutlineLogout } from 'react-icons/ai'

/**
export async function validateToken(token) {
  const res = await fetch(`/api/validate-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })

  const jsonData = res.json()
  return jsonData
}
*/

export async function getServerSideProps(context) {
  try {
    const result = await getServerSession(context.req, context.res)

    const { image, ...userData } = result.user

    return {
      props: {
        user: userData
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      },
      props: {}
    }
  }

  /**
    const { req } = context
    const token = await getToken({ req })

    if (!token) {
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_URL}/auth`,
          permanent: false
        }
      }
    }

    return {
      props: {
        data: token
      }
    }
    */
}

export default function Dashboard({ user }) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async (e) => {
    await signOut({ redirect: true, callbackUrl: '/auth' })
  }

  if (session) {
    return (
      <div className="flex flex-col w-full h-screen">
        <div className="flex h-20 w-full bg-gray-300">
          <div className="flex flex-1 items-center">
            <span className="text-2xl font-bold m-2">Next</span>
            <span className="text-2xl">Auth</span>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex flex-2">
              <h1 className="flex justify-end">
                <span className="mr-2">Hello,</span>
                <span className="font-bold"> {user.name} </span>
                <span className="">, welcome!</span>
              </h1>
            </div>
            <div className="flex-1">
              <AiOutlineLogout className="m-5" size={'1.5rem'} onClick={handleLogout} />
            </div>
          </div>
        </div>
        <div className="flex h-full">
          <pre>{JSON.stringify(user)}</pre>
        </div>
      </div>
    )
  }
  return <h1>Acesso restrito</h1>
}
