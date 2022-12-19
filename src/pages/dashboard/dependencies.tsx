import { useEffect, useState } from 'react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { DependencieTable } from '~/components/ui/organisms/DependencieTable'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'

const DependenciesPage = () => {
  const { user } = useUser()
  const ventures = useVentures(user)

  const [activeVenture, setActiveVenture] = useState<string>('')

  useEffect(() => {
    if (!ventures.isLoading) {
      setActiveVenture(String(ventures.data?.[1].Obra_Ven))
    }
  }, [ventures])

  console.log(ventures)

  return (
    <TemplateDashboard title="Pendências" description="Todos as pendências">
      <Box>
        <div className="flex flex-wrap mb-8">
          {ventures.isLoading
            ? 'carregando...'
            : ventures.data?.map(
                (venture, index) =>
                  index > 0 && (
                    <button
                      key={index}
                      onClick={() => setActiveVenture(venture.Obra_Ven)}
                      className="px-4 py-1 bg-blue-700 rounded-full text-white text-sm"
                    >
                      {venture.Descr_obr}
                    </button>
                  )
              )}
        </div>

        {ventures.data?.map((venture, index) => {
          return (
            index > 0 && (
              <DependencieTable
                key={index}
                venture={venture.Empreendimento_ven}
                sale={venture.Num_Ven}
                company={venture.Empresa_ven}
                building={venture.Obra_Ven}
              />
            )
          )
        })}
      </Box>
    </TemplateDashboard>
  )
}

export default DependenciesPage
