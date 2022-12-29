import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { ListOfVenturesAPIResponse } from '~/types/post'

async function venturesContentRoute(
  req: NextApiRequest,
  res: NextApiResponse<ListOfVenturesAPIResponse>
) {
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
        query: `query AllVentures {
          ventures {
            nodes {
              title
              video
              content
              images {
                nodes {
                  sourceUrl
                }
              }
              documents {
                nodes {
                  title
                  mediaItemUrl
                }
              }
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
    res.status(400).json({ data: { ventures: { nodes: [] } } })
  }
}

export default withIronSessionApiRoute(venturesContentRoute, sessionOptions)
