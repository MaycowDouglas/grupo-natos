import { useEffect, useRef, useState } from 'react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import useBoletos from '~/hooks/useBoletos'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'
import fetchJson, { FetchError } from '~/lib/fetchJson'

const BoletosPage = () => {
  const downloadButton: any = useRef()

  const { user } = useUser()
  const ventures = useVentures(user)
  const boletos = useBoletos(user)

  const [activeVenture, setActiveVenture] = useState<string>('')
  const [pdfLink, setPdfLink] = useState('')

  useEffect(() => {
    if (!ventures.isLoading) {
      setActiveVenture(String(ventures.data?.[1].Obra_Ven))
    }
  }, [ventures])

  const handleViewBoleto = async (bank: number, numBoleto: number) => {
    try {
      const response = await fetchJson('/api/boletos/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank, numBoleto }),
      })

      setPdfLink(`data:application/pdf;base64,${response}`)
      downloadButton.current.click()
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data.message)
      } else {
        console.error({
          'An unexpected error happened': error,
        })
      }
    }
  }

  console.log()

  return (
    <TemplateDashboard title="Boletos" description="Todos os boletos">
      <Box>
        <a ref={downloadButton} href={pdfLink} download={`boleto.pdf`} className="hidden">
          Visualizar
        </a>
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

        <table className="w-full text-center">
          <thead>
            <tr className="">
              <th className="pb-6 hidden md:table-cell text-gray-500 font-medium">Emissão</th>
              <th className="pb-6 text-gray-500 font-medium">Vencimento</th>
              <th className="pb-6 hidden lg:table-cell text-gray-500 font-medium">Número</th>
              <th className="pb-6 hidden lg:table-cell text-gray-500 font-medium">Banco</th>
              <th className="pb-6 hidden md:table-cell text-gray-500 font-medium">Cedente</th>
              <th className="pb-6 text-gray-500 font-medium">Valor</th>
              <th className="pb-6 ">
                <span className="invisible">Ação</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {boletos.isLoading ? (
              <tr>
                <td className="text-center py-5" colSpan={7}>
                  Carregando...
                </td>
              </tr>
            ) : (
              boletos.data?.map((boleto, index) => {
                const due_date = new Date(boleto.dataVencimento)
                const issue_date = new Date(boleto.dataEmissao)

                const print_date = [
                  {
                    d:
                      issue_date.getDate() < 10 ? '0' + issue_date.getDate() : issue_date.getDate(),
                    m:
                      issue_date.getMonth() + 1 < 10
                        ? '0' + (issue_date.getMonth() + 1)
                        : issue_date.getMonth() + 1,
                    y: issue_date.getFullYear(),
                  },
                  {
                    d: due_date.getDate() < 10 ? '0' + due_date.getDate() : due_date.getDate(),
                    m: due_date.getMonth() < 10 ? '0' + due_date.getMonth() : due_date.getMonth(),
                    y: due_date.getFullYear(),
                  },
                ]

                return (
                  boleto.obraParcela === activeVenture && (
                    <tr key={index} className="">
                      <td className="py-2 hidden md:table-cell text-sm font-medium">{`${print_date[0].d}/${print_date[0].m}/${print_date[0].y}`}</td>
                      <td className="py-2 text-sm font-medium">{`${print_date[1].d}/${print_date[1].m}/${print_date[1].y}`}</td>
                      <td className="py-2 hidden lg:table-cell text-sm font-medium">
                        {boleto.seuNumero}
                      </td>
                      <td className="py-2 hidden lg:table-cell text-sm font-medium">
                        {boleto.codBanco}
                      </td>
                      <td className="py-2 hidden md:table-cell text-sm font-medium">
                        {boleto.descricaoObra}
                      </td>
                      <td className="py-2 text-sm font-medium">
                        <span>R$ {boleto.valorDocumento}</span>
                      </td>
                      <td className="py-2 ">
                        <button
                          onClick={() => handleViewBoleto(boleto.codBanco, boleto.seuNumero)}
                          className="px-3 py-2 rounded-full bg-blue-700 text-xs text-white"
                        >
                          Visualizar
                        </button>
                      </td>
                    </tr>
                  )
                )
              })
            )}
          </tbody>
        </table>
      </Box>
    </TemplateDashboard>
  )
}

export default BoletosPage
