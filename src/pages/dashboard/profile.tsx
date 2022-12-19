import { TemplateDashboard } from '~/components/templates/Dashboard'
import { InputPassword } from '~/components/ui/atoms/InputPassword'

const ProfilePage = () => {
  return (
    <TemplateDashboard title="Perfil" description="">
      <main className="m-5 p-5 rounded-xl max-w-sm shadow-[0_0_26px_rgba(0,0,0,0.11)] bg-white overflow-auto">
        <h2 className="font-medium text-2xl mb-5">Alterar senha</h2>
        <form action="" className="space-y-4">
          <InputPassword placeholder="Nova Senha" minLength={6} />
          <button className="w-full flex justify-center items-center gap-2 py-2 border-2 border-blue-700 rounded-full bg-blue-700 text-white font-medium">
            Mudar senha
          </button>
        </form>
      </main>
    </TemplateDashboard>
  )
}

export default ProfilePage
