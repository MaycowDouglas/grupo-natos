import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'

async function PixByInstallmentRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user
  const { company, building, sale, installment, generalInstallment } = req.body

  console.log(req.body)

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  // if (building !== 'OLPAC' || company !== 1) {
  //   res.status(403).end()
  //   return
  // }

  try {
    const uau_user_token: string = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Autenticador/AutenticarUsuario`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({
          Login: process.env.UAU_USER_INTEGRATION,
          Senha: process.env.UAU_USER_PASSWORD,
          UsuarioUAUSite: 'string',
        }),
      }
    )

    const response: any = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Pix/PixPorParcelas`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: uau_user_token,
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify([
          {
            Empresa: company,
            Obra: building,
            NumeroVenda: sale,
            NumeroParcela: installment,
            TipoParcela: 'P',
            NumeroParcelaGeral: generalInstallment,
          },
        ]),
      }
    )

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.response.status === 401) {
        req.session.destroy()
      }
    }
    res.status(400).json(error)
  }
}

export default withIronSessionApiRoute(PixByInstallmentRoute, sessionOptions)
