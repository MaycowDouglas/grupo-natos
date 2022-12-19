export type Post = {
  author: { node: { name: string } }
  content?: string
  date: string
  featuredImage: { node: { sourceUrl: string; altText?: string } }
  slug: string
  title: string
}

export type ListOfPostsAPIResponse = {
  data: { posts: { nodes: Post[] } }
}

export type SinglePostAPIResponse = {
  data: { postBy: Post }
}
