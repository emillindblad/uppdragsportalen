import { useSession } from 'next-auth/react'

export const IsMK = () => {
  const { data: session } = useSession()
  return session?.user.isAdmin;
}

export default IsMK
