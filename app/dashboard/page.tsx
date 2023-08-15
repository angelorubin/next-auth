'use client'
import { signOut } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import Icon from '@/components/icon'
import SessionChecker from '@/components/session-checker'
import { useSession } from 'next-auth/react'
/*
export async function getServerSideProps(context: any) {
  try {
    const session = await getServerSession(context.req, context.res)

    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
    }

    // O usuário está logado, você pode acessar as informações do usuário através de session.user
    return {
      props: {}
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
}
*/

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <SessionChecker>
      <div className="flex gap-1">
        <h2 className="flex-1">Dashboard</h2>
        <div className="">
          <pre>{session?.user?.email}</pre>
        </div>
        <button
          className="bg-blue-500 text-white font-bold p-1"
          onClick={() => signOut({ callbackUrl: '/auth' })}
        >
          logout
        </button>
      </div>
    </SessionChecker>
  )
}

  /**
  const router = useRouter()
  const session = useSession()

  const image = session?.data?.user?.image ?? false
  const name = session?.data?.user?.name ?? false

  const handleLogout = async (e) => {
    await signOut({ redirect: true, callbackUrl: '/auth' })
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex h-20 w-full bg-gray-300">
        <div className="flex flex-1 items-center">
          <span className="text-2xl font-bold m-2">Next</span>
          <span className="text-2xl">Auth</span>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="m-1">
            {image ? (
              <img className="border rounded-full h-10 w-10" src={image} alt={'user-image'} />
            ) : (
              <Icon size={'2rem'}>
                <FaUserCircle />
              </Icon>
            )}
          </div>

          <div className="flex flex-2">
            <h1 className="flex justify-end">
              <span className="font-bold text-xs"> {name && session.data.user.name} </span>
            </h1>
          </div>

          <div className="flex-1 m-1">
            <Icon size={'1.5rem'}>
              <AiOutlineLogout onClick={handleLogout} />
            </Icon>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
  */

