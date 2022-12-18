import { NextPage } from 'next'
import Link from 'next/link'
import { FormEvent, useCallback, useState } from 'react'

import { Button } from '~/components/ui/atoms/Button'
import { ButtonLink } from '~/components/ui/atoms/ButtonLink'
import { Heading } from '~/components/ui/atoms/Heading'
import { Input } from '~/components/ui/atoms/Input'
import { InputPassword } from '~/components/ui/atoms/InputPassword'
import { Text } from '~/components/ui/atoms/Text'
import useUser from '~/hooks/useUser'
import fetchJson, { FetchError } from '~/lib/fetchJson'

const LoginPage: NextPage = () => {
  const [messageError, setMessageError] = useState('')
  const { mutateUser } = useUser({
    redirectTo: '/dashboard/',
    redirectIfFound: true,
  })

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const body = {
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
      }

      try {
        const response = mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        )

        console.log(response)
      } catch (error) {
        if (error instanceof FetchError) {
          if (error.response.status === 400) {
            setMessageError('Ops! Usuário ou senha inválido!')
            return
          }
          setMessageError(String(error.response.status))
        } else {
          console.error({
            'An unexpected error happened': error,
          })
        }
      }
    },
    [mutateUser]
  )

  return (
    <div className="container h-screen flex items-end md:items-center md:gap-20 xl:gap-40 pb-10 md:pb-0 px-5 lg:px-28 xl:px-56">
      <section>
        <div className="mb-10">
          <Heading level={1} className="sr-only">
            Login
          </Heading>
          <Heading size={36} className="mb-4">
            Olá cliente Natos!
          </Heading>
          <Text size={18} isMuted>
            O Portal do cliente é um espaço criado para você que adquiriu seu apartamento de lazer
            compartilhado.
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-7">
            <Input id="username" type="text" name="username" placeholder="Usuário" />
            <InputPassword />
          </div>
          <Button className="w-full">Entrar</Button>
          <p className={`mt-4 text-red-500 text-center`}>{messageError}</p>
        </form>

        <Link href="/first-access" legacyBehavior>
          <a className="block md:hidden mt-20 text-gray-500 font-medium text-center">
            Não tem uma conta? <span className="text-blue-700">Registrar</span>
          </a>
        </Link>
      </section>
      <section className="hidden md:block">
        <Heading>Já é cliente mas é seu primeiro acesso?</Heading>
        <div className="space-y-4 my-5">
          <Text isMuted>
            Siga o link abaixo e faça seu cadastro com senha para acessar sua área restrita em nosso
            portal!
          </Text>
          <Text isMuted>
            Ao encaminhar minhas informações, declaro estar ciente que meus dados pessoais serão
            tratados conforme a Política de Privacidade.
          </Text>
        </div>
        <ButtonLink href="/first-access" color="black">
          Criar Acesso
        </ButtonLink>
      </section>
    </div>
  )
}

export default LoginPage
