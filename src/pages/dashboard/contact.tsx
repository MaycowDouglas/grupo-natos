import { FormEvent, useCallback } from 'react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Button } from '~/components/ui/atoms/Button'
import { Input } from '~/components/ui/atoms/Input'
import useUser from '~/hooks/useUser'
import fetchJson from '~/lib/fetchJson'
import { capitalize } from '~/utils/functions'
import { masks } from '~/utils/masks'

const ContactPage = () => {
  const { user } = useUser()

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = {
      phone: event.currentTarget.phone.value,
      email: event.currentTarget.email.value,
      subject: event.currentTarget.subject.value,
      message: event.currentTarget.message.value,
      username: event.currentTarget.username.value,
    }

    try {
      const response = await fetchJson('/api/mail', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      alert('Email enviado!')
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <TemplateDashboard title="Contato" description="Todos os boletos">
      <Box className="max-w-lg mx-5 md:mt-32 md:mx-auto">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Input
              name="username"
              placeholder="Assunto"
              defaultValue={capitalize(String(user?.name))}
              disabled
              required
            />
            <Input
              name="phone"
              mask="phone"
              placeholder="Telefone"
              defaultValue={masks.phone(`${user?.phones[1].ddd}${user?.phones[1].numero}`)}
              required
            />
          </div>
          <Input name="email" placeholder="E-mail" defaultValue={user?.email} required />
          <Input name="subject" placeholder="Assunto" required />
          <textarea
            name="message"
            className="w-full h-32 px-4 py-2 border-2 border-transparent rounded-2xl outline-none bg-gray-100 text-lg"
            placeholder="Mensagem"
            required
          />
          <div className="text-right">
            <Button>Enviar</Button>
          </div>
        </form>
      </Box>
    </TemplateDashboard>
  )
}

export default ContactPage
