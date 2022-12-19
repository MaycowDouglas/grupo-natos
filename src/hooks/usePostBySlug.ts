import useSWR from 'swr'

import { SinglePostAPIResponse } from '~/types/post'
import { UserSession } from '~/types/user'

export default function usePostBySlug(user: UserSession | undefined, slug: string) {
  const { data, error } = useSWR<SinglePostAPIResponse>(
    user?.isLogged ? `/api/posts/${slug}` : null
  )

  return {
    post: data?.data.postBy,
    isLoading: !error && !data,
    isError: error,
  }
}
