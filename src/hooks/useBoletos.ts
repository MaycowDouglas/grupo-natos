import useSWR from 'swr'

import { Boleto } from '~/types/boleto'
import { UserSession } from '~/types/user'

export default function useBoletos(user: UserSession | undefined) {
  const { data, error } = useSWR<Boleto[]>(user?.isLogged ? `/api/boletos` : null)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
