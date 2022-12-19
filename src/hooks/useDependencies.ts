import useSWR from 'swr'

import { UserSession } from '~/types/user'

export default function useDependencies(
  user: UserSession | undefined,
  sale: number,
  company: number,
  building: string
) {
  const { data, error } = useSWR(
    user?.isLogged ? `/api/dependencies/${company}/${building}/${sale}` : null
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
