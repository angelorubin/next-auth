import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useSession } from 'next-auth/react'

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
  } catch (error) {
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_URL}/auth`,
        permanent: false
      }
    }
  }
}

export default function Dashboard({ data }) {
  const router = useRouter()
  const { name } = data

  const handleLogout = async (e) => {
    await signOut()
    window.location.href = '/auth'
  }

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
              <span className="font-bold"> {name} </span>
              <span className="">, welcome!</span>
            </h1>
          </div>
          <div className="flex-1">
            <AiOutlineLogout className="m-5" size={'1.5rem'} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}
