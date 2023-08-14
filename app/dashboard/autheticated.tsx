import { getServerSession } from 'next-auth/next'

export default async function Authenticated() {
  const session = await getServerSession()
  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
