import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import { FetchError } from '~/lib/fetchJson'
import { UserSession } from '~/types/user'

async function userRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
  if (req.session.user) {
    try {
      res.json({
        ...req.session.user,
        isLogged: true,
      })
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.message)
      }
      console.error(error)
    }
  } else {
    res.json({
      code: 0,
      name: '',
      token: '',
      username: '',
      email: '',
      phones: [],
      birthdate: new Date(),
      document: '',
      isLogged: false,
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
