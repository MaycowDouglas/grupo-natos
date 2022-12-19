import useSWR from 'swr'

import { ListOfPostsAPIResponse } from '~/types/post'
import { UserSession } from '~/types/user'

export default function useFeaturedPosts(user: UserSession | undefined) {
  const { data, error } = useSWR<ListOfPostsAPIResponse>(
    user?.isLogged ? `/api/posts/featured` : null
  )

  return {
    posts: data?.data.posts.nodes,
    isLoading: !error && !data,
    isError: error,
  }
}
