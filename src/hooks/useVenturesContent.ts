import useSWR from 'swr'

import { ListOfVenturesAPIResponse } from '~/types/post'
import { UserSession } from '~/types/user'

export default function useVenturesContent(user: UserSession | undefined) {
  const { data, error } = useSWR<ListOfVenturesAPIResponse>(
    user?.isLogged ? `/api/ventures/content` : null
  )

  return {
    content: data?.data.ventures.nodes,
    isLoading: !error && !data,
    isError: error,
  }
}
