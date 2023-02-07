import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { FaUser, FaUserTie } from 'react-icons/fa'
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri'

import { Button } from '~/components/ui/atoms/Button'
import { ButtonLink } from '~/components/ui/atoms/ButtonLink'
import { Input } from '~/components/ui/atoms/Input'
import { InputPassword } from '~/components/ui/atoms/InputPassword'
import fetchJson from '~/lib/fetchJson'

type PersonTypes = 'PF' | 'PJ'

const FirstAccessPage = () => {
  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = {
      email: event.currentTarget.email.value,
      login: event.currentTarget.login.value,
      document: event.currentTarget.document.value,
      password: event.currentTarget.password.value,
      birthdate: new Date(event.currentTarget.birthdate.value).toISOString(),
    }

    try {
      const response = await fetchJson('/api/create-access', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(response)
    } catch (error) {
      alert('Pessoa não encontrada!')
    }
  }, [])

  return (
    <div className="container flex justify-center items-end md:items-center pt-10 px-5 lg:px-28 xl:px-56">
      <section className="text-center max-w-sm">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Criar acesso ao portal</h1>
        <p className="text-gray-500 text-lg">
          O acesso ao portal é exclusivo para aqueles que já são nossos clientes.
        </p>

        <form className="mt-10" onSubmit={handleSubmit}>
          <p className="text-left mb-1">Data de nascimento</p>
          <div className="space-y-4">
            <Input type="date" name="birthdate" required />
            <Input type="text" name="document" mask="cpf" placeholder="CPF" required />
            <Input type="text" name="login" placeholder="Login" minLength={6} required />
            <Input type="email" name="email" placeholder="Email" required />
            <InputPassword
              name="password"
              placeholder="Senha"
              minLength={6}
              maxLength={6}
              required
            />
            <div className="space-y-2">
              <Button className="w-full">Criar Acesso</Button>
              <ButtonLink href="/login" className="w-full" color="red" isOutline>
                Cancelar
              </ButtonLink>
            </div>
            <small className="block w-4/5 mt-3 mx-auto leading-4">
              Ao clicar em {`"Criar acesso"`} você aceita nossos{' '}
              <span className="text-blue-700 cursor-pointer">termos de uso</span>
            </small>
          </div>
        </form>
      </section>

      {/* <section className="text-center max-w-sm">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Criar acesso ao portal</h1>
        <p className="text-gray-500 text-lg">
          O acesso ao portal é exclusivo para aqueles que já são nossos clientes.
        </p>

        <form action="">
          <div className="space-y-4 my-7 text-left">
            <div className="flex justify-center gap-5">
              <div className="flex items-center gap-2 text-lg">
                <input className="hidden" type="radio" id="pf" name="type" value="PF" />
                <label
                  htmlFor="pf"
                  className={`inline-flex items-center gap-1 px-4 py-3 rounded-full text-sm cursor-pointer ${
                    personType === 'PF' && 'bg-blue-700 text-white font-medium'
                  }`}
                  onClick={() => handlePersonTypeChange('PF')}
                >
                  <FaUser />
                  Pessoa Física
                </label>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <input className="hidden" type="radio" id="pj" name="type" value="PJ" />
                <label
                  htmlFor="pj"
                  className={`inline-flex items-center gap-1 px-4 py-3 rounded-full text-sm cursor-pointer ${
                    personType === 'PJ' && 'bg-blue-700 text-white font-medium'
                  }`}
                  onClick={() => handlePersonTypeChange('PJ')}
                >
                  <FaUserTie /> Pessoa Jurídica
                </label>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="date" className="inline-block mb-1 text-gray-500">
                Data de {personType === 'PJ' ? 'Fundação' : 'Nascimento'}
              </label>
              <Input id="date" type="date" name="date" placeholder="Data" />
            </div>
            <div className="relative">
              <label htmlFor="document" className="sr-only">
                Documento
              </label>
              {personType === 'PF' && (
                <Input id="document" mask="cpf" type="text" name="document" placeholder="CPF" />
              )}
              {personType === 'PJ' && (
                <Input id="document" mask="cnpj" type="text" name="document" placeholder="CNPJ" />
              )}
            </div>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full bg-gray-100 text-lg"
                placeholder="E-mail"
              />
            </div>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="login"
                type="text"
                name="login"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full bg-gray-100 text-lg"
                placeholder="Login"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                type={passwordIsVisible ? 'text' : 'password'}
                name="password"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
                placeholder="Senha"
              />
              <span
                onClick={() => setPasswordVisility(!passwordIsVisible)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
              >
                {passwordIsVisible ? <RiEyeLine /> : <RiEyeCloseLine />}
              </span>
            </div>
          </div>

          <button className="w-full flex justify-center items-center gap-2 py-2 border-2 border-blue-700 rounded-full bg-blue-700 text-white font-medium">
            Criar Acesso
          </button>

          <small className="block w-4/5 mt-3 mx-auto leading-4">
            Ao clicar em {`"Criar acesso"`} você aceita nossos{' '}
            <span className="text-blue-700 cursor-pointer">termos de uso</span>
          </small>
        </form>
      </section> */}
    </div>
  )
}

export default FirstAccessPage
