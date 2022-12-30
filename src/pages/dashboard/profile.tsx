import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect } from 'react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Input } from '~/components/ui/atoms/Input'
import { InputPassword } from '~/components/ui/atoms/InputPassword'
import useUser from '~/hooks/useUser'
import fetchJson from '~/lib/fetchJson'
import { masks } from '~/utils/masks'

const ProfilePage: NextPage = () => {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  const handleChangeProfile = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const body = {
        login: event.currentTarget.login.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }

      try {
        await fetchJson('/api/update-profile', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        alert('Dados alterados com sucesso! Iremos te deslogar para que a mudanças façam efeito.')

        mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
        router.push('/login')
      } catch (error) {
        console.error(error)
      }
    },
    [router, mutateUser]
  )

  console.log(user)

  return (
    <TemplateDashboard title="Perfil" description="">
      <main className="grid place-content-center md:h-[600px]">
        <Box className="max-w-sm">
          <h2 className="text-2xl font-medium mb-6">Alterar credenciais</h2>
          <form className="space-y-4" onSubmit={handleChangeProfile}>
            <Input
              type="text"
              name="login"
              placeholder="Login"
              defaultValue={user?.username}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={user?.email}
              required
            />

            <InputPassword placeholder="Nova Senha" minLength={6} required />

            <button className="w-full flex justify-center items-center gap-2 py-2 border-2 border-blue-700 rounded-full bg-blue-700 text-white font-medium">
              Enviar
            </button>
          </form>
        </Box>
      </main>
    </TemplateDashboard>
  )
}

export default ProfilePage
