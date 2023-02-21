import { useSession } from 'next-auth/react'
import { api } from './api'

export const IsMK = () => {
  const { data: session } = useSession()
  const admins = api.user.getAdmins.useQuery()
  return admins.data?.some((admin) => admin.id == session?.user?.id)
}

export default IsMK