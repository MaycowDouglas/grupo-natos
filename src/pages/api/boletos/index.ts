import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { Boleto } from '~/types/boleto'

async function boletosRoute(req: NextApiRequest, res: NextApiResponse<Boleto[]>) {
  const user = req.session.user

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const response: Boleto[] = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/BoletoServices/ConsultarBoletosDoCliente`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: user.token,
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({
          usuario: user.username,
          codPessoa: user.code,
          naoMostraBoletoVencido: true,
          tipo_usuario: 1,
        }),
      }
    )

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.message)
    }
    console.error(error)
    res.status(400).json([])
  }
}

export default withIronSessionApiRoute(boletosRoute, sessionOptions)
