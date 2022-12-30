import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { ApiResponseUserLogged, UserSession } from '~/types/user'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
    const token = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Autenticador/AutenticarUsuario`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
        body: JSON.stringify({ Login: username, Senha: password, UsuarioUAUSite: 'qtcnatos' }),
      }
    )

    const {
      '0': { dadospessoais },
      '1': { dadostelefone },
    }: ApiResponseUserLogged = await fetchJson(
      `${process.env.UAU_BASEURL_INTEGRATION}/Autenticador/ConsultarDadosUsrLogado`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: String(token),
          'X-INTEGRATION-Authorization': String(process.env.UAU_TOKEN_INTEGRATION),
        },
      }
    )

    const user = {
      token,
      username,
      name: dadospessoais[1].nome,
      code: dadospessoais[1].codigo,
      phones: dadostelefone,
      email: dadospessoais[1].email,
      document: dadospessoais[1].cpf,
      birthdate: dadospessoais[1].dtnasc,
      isLogged: true,
    } as UserSession

    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.response.status === 400) {
        return res.status(400).json({ message: 'Usuário ou senha inválido!' })
      }
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
