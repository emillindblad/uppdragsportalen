import { useEffect, useState } from 'react'

export const useIsMK = () => {
  const [isMK, setIsMK] = useState(true)
  useEffect(() => {
    //TODO kod för att kolla att man är MK
                },
            []
        )
  return isMK
}

export default useIsMK