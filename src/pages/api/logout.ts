import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '~/configs/session'
import { UserSession } from '~/types/user'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
  req.session.destroy()
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

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
