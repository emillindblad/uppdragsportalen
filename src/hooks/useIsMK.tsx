import { useSession } from 'next-auth/react'
import { api } from '../utils/api'

export const useIsMK = () => {
  const { data: session } = useSession()
  const admins = api.user.getAdmins.useQuery()
  return admins.data?.some((admin) => admin.id == session?.user?.id)
}

export default useIsMK