import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { Post, SinglePostAPIResponse } from '~/types/post'

async function postBySlugRoute(req: NextApiRequest, res: NextApiResponse<SinglePostAPIResponse>) {
  const user = req.session.user
  const { slug } = req.query

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
        query: `query PostBySlug($slug: String = "") {
          postBy(slug: $slug) {
            author {
              node {
                name
              }
            }
            content
            date
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            slug
            title
          }
        }`,
        variables: {
          slug,
        },
      }),
    })

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.message)
    }
    console.error(error)
    res.status(400).json({ data: { postBy: {} as Post } })
  }
}

export default withIronSessionApiRoute(postBySlugRoute, sessionOptions)
