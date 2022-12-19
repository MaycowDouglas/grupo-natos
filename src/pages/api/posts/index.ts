import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { ListOfPostsAPIResponse } from '~/types/post'

async function postsRoute(req: NextApiRequest, res: NextApiResponse<ListOfPostsAPIResponse>) {
  const user = req.session.user

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const response: any = await fetchJson(String(process.env.WORDPRESS_API_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query AllPosts {
          posts(where: {categoryName: "Sem categoria",status: PUBLISH}) {
            nodes {
              author {
                node {
                  name
                }
              }
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              slug
              title
            }
          }
        }`,
      }),
    })

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.message)
    }
    console.error(error)
    res.status(400).json({ data: { posts: { nodes: [] } } })
  }
}

export default withIronSessionApiRoute(postsRoute, sessionOptions)
