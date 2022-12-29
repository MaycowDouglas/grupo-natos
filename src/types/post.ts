export type Post = {
  author: { node: { name: string } }
  content?: string
  date: string
  featuredImage: { node: { sourceUrl: string; altText?: string } }
  slug: string
  title: string
}

export type Venture = {
  title: string
  video: string
  content?: string
  images: { nodes: { sourceUrl: string }[] }
  documents: { nodes: { title: string; mediaItemUrl: string }[] }
}

export type ListOfPostsAPIResponse = {
  data: { posts: { nodes: Post[] } }
}

export type ListOfVenturesAPIResponse = {
  data: { ventures: { nodes: Venture[] } }
}

export type SinglePostAPIResponse = {
  data: { postBy: Post }
}
