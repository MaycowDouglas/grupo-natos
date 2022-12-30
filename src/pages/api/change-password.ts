import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { ApiResponseUserLogged, UserSession } from '~/types/user'

async function changePasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user
  const { password } = await req.body

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    await fetchJson(`${process.env.UAU_BASEURL_INTEGRATION}/Pessoas/AlterarSenhaCliente`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: user.token,
        'Content-Type': 'application/json',
        'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
      },
      body: JSON.stringify({
        codigo_cliente: user.code,
        senha: password,
      }),
    })

    return res.status(200).json([])
  } catch (error) {
    console.error(error)
    if (error instanceof FetchError) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}

export default withIronSessionApiRoute(changePasswordRoute, sessionOptions)
