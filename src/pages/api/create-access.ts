import { NextApiRequest, NextApiResponse } from 'next'

import fetchJson, { FetchError } from '~/lib/fetchJson'

export default async function createAccessRoute(req: NextApiRequest, res: NextApiResponse) {
  const { document, birthdate, login, password, email } = req.body

  try {
    const response: any = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Pessoas/CriarCredenciaisUAUWeb`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({
          CPF: document,
          DataNascimento: birthdate,
          Login: login,
          Senha: password,
          Email: email,
        }),
      }
    )

    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    if (error instanceof FetchError) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
