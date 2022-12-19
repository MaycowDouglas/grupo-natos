import { TemplateDashboard } from '~/components/templates/Dashboard'
import useUser from '~/hooks/useUser'

const ContactPage = () => {
  return (
    <TemplateDashboard title="Contato" description="Todos os boletos">
      <main className="w-4/5 xl:w-3/5 mx-auto mb-32 mt-20 md:mb-0 p-5 rounded-xl shadow-[0_0_26px_rgba(0,0,0,0.11)] bg-white">
        <form action="">
          <div className="grid grid-cols-3 gap-5">
            <div className="relative col-span-3 md:col-span-1">
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
                placeholder="Nome completo"
              />
            </div>
            <div className="relative col-span-3 md:col-span-1">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
                placeholder="E-mail"
              />
            </div>
            <div className="relative col-span-3 md:col-span-1">
              <label htmlFor="phone" className="sr-only">
                Telefone
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                className="w-full px-4 py-2 border-2 border-transparent rounded-3xl outline-none bg-gray-100 text-lg"
                placeholder="Telefone"
              />
            </div>
            <div className="relative col-span-3">
              <label htmlFor="subject" className="sr-only">
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
                placeholder="Assunto"
              />
            </div>
            <div className="relative col-span-3">
              <label htmlFor="message" className="sr-only">
                Email
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full h-32 px-4 py-2 border-2 border-transparent rounded-3xl outline-none bg-gray-100 text-lg"
                placeholder="Mensagem"
              />
            </div>

            <div className="md:pr-10 col-span-3 md:col-span-2">
              <small className="inline-block leading-4">
                Ao encaminhar minhas informações, declaro estar ciente que meus dados pessoais serão
                tratados conforme a{' '}
                <span className="text-blue-700 cursor-pointer">Política de Privacidade.</span>
              </small>
            </div>
            <div className="col-span-3 md:col-span-1">
              <button className="w-full flex justify-center items-center gap-2 py-2 border-2 border-blue-700 rounded-full bg-blue-700 text-white font-medium">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </main>
    </TemplateDashboard>
  )
}

export default ContactPage
