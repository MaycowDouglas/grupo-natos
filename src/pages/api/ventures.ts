import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { UserVentures, UserVenturesAPIResponse } from '~/types/user'

async function venturesRoute(req: NextApiRequest, res: NextApiResponse<UserVenturesAPIResponse>) {
  const user = req.session.user

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const response: UserVenturesAPIResponse = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Venda/ConsultarEmpreendimentosCliente`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: user.token,
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({
          codigo_usuario: user.code,
        }),
      }
    )

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.message)
    }
    console.error(error)
    res.status(400).json([{ MyTable: [] }])
  }
}

export default withIronSessionApiRoute(venturesRoute, sessionOptions)
