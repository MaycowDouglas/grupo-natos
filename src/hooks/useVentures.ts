import useSWR from 'swr'

import { UserVenturesAPIResponse } from '~/types/user'
import { UserSession } from '~/types/user'

export default function useVentures(user: UserSession | undefined) {
  const { data, error } = useSWR<UserVenturesAPIResponse>(user?.isLogged ? `/api/ventures` : null)

  return {
    data: data?.[0].MyTable,
    isLoading: !error && !data,
    isError: error,
  }
}
