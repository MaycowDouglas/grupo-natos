import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'

async function PaymentsRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user
  const { sale, building, company } = req.body

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const response: any = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/ExtratoDoCliente/GerarPDFExtratoCliente`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: user.token,
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({
          empresa: parseInt(company),
          obra: building,
          numVenda: parseInt(sale),
          tipoOrdenacao: 0,
          dataCalculo: new Date().toISOString(),
          ocultarUsuario: true,
          valorAntecipado: true,
          dataProrrogacao: true,
          ocultarPersonalizacao: true,
          residuoIraComporValorTotal: true,
        }),
      }
    )

    res.status(200).json(response)
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.response.status === 401) {
        req.session.destroy()
      }
      console.error(error.message)
    }
    console.error(error)
    res.status(400).json([])
  }
}

export default withIronSessionApiRoute(PaymentsRoute, sessionOptions)
