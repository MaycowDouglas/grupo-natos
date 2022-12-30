import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function mainRoute(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email, subject, message, username } = req.body

  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))

  const msg = {
    to: 'atendimento@gruponatos.com.br',
    from: 'sistema@quantico.cc',
    subject: subject,
    html: `
      <p><strong>Usuário:</strong> ${username}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Mensagem:</strong> ${message}</p>
    `,
  }

  try {
    await sgMail.send(msg)
    return res.status(200).json({ message: 'Ok' })
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
