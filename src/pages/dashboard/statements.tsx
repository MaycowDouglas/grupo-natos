import nProgress from 'nprogress'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'
import fetchJson, { FetchError } from '~/lib/fetchJson'

const StatementsPage = () => {
  const downloadButton: any = useRef()

  const { user } = useUser()
  const ventures = useVentures(user)

  const [pdfLink, setPdfLink] = useState('')
  const [year, setYear] = useState<string>('')

  const handleChangeYear = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setYear(event.currentTarget.value.replace(/\D/g, ''))
  }, [])

  const handleIRPFSearch = async (sale: string, building: string, company: string) => {
    nProgress.start()

    if (year.length === 4) {
      try {
        const response = await fetchJson('/api/irpf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sale, building, company }),
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
    } else {
      alert('Informe o ano')
    }

    nProgress.done()
    nProgress.remove()
  }

  if (ventures.isLoading) {
    return <h1>Carregando...</h1>
  }

  return (
    <TemplateDashboard title="Extratos" description="Todos os extratos">
      <Box>
        <a ref={downloadButton} href={pdfLink} download={`irpf-${year}.pdf`} className="hidden">
          Visualizar
        </a>
        <div className="grid grid-cols-12 items-center mb-5 md:space-x-5">
          <span className="hidden md:inline-flex text-sm font-medium text-gray-500">Empresa</span>
          <span className="hidden md:inline-grid md:col-span-2 xl:col-span-1 text-sm font-medium text-gray-500">
            Nº Contrato
          </span>
          <span className="hidden xl:inline-grid xl:col-span-3 text-sm font-medium text-gray-500">
            Empreendimento
          </span>
          <span className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 text-sm font-medium text-gray-500">
            Cód-Descrição do Produto
          </span>
          <span className="hidden lg:inline-grid lg:col-span-3 text-sm font-medium text-gray-500">
            Cód Produto-Identificador Unid.
          </span>
          {/* <span className="hidden md:inline-flex text-sm font-medium text-gray-500">Empresa</span>
          <span className="hidden md:inline-flex lg:col-span-2 text-sm font-medium text-gray-500">
            Nº Contrato
          </span>
          <span className="hidden text-sm font-medium text-gray-500">Empreendimento</span>
          <span className="col-span-2 lg:col-span-3 text-sm font-medium text-gray-500">
            Cód-Descrição do Produto
          </span>
          <span className="hidden text-sm font-medium text-gray-500">
            Cód Produto-Identificador Unid.
          </span> */}
        </div>

        {ventures.data?.map((venture, index: number) => {
          if (index > 0) {
            return (
              <div key={index} className="grid grid-cols-12 items-center md:space-x-5 my-3">
                <span className="hidden md:inline-grid text-xs font-bold">
                  {venture.Empresa_ven}
                </span>
                <span className="hidden md:inline-grid md:col-span-2 xl:col-span-1 text-xs font-bold">
                  {venture.Num_Ven}
                </span>
                <span className="hidden xl:inline-grid xl:col-span-3 text-xs font-bold">
                  {venture.Empreendimento_ven}
                </span>
                <span className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 text-xs font-bold">
                  {venture.Descr_obr}
                </span>
                <span className="hidden lg:inline-grid lg:col-span-3 text-xs font-bold">
                  {venture.Identificador_unid}
                </span>
                {/* <span className="hidden md:inline-flex text-xs font-bold">
                  {venture.Empresa_ven}
                </span>
                <span className="hidden md:inline-flex lg:col-span-2 text-xs font-bold">
                  {venture.Num_Ven}
                </span>
                <span className="hidden text-xs font-bold">{venture.Empreendimento_ven}</span>
                <span className="md:col-span-2 lg:col-span-3 text-xs font-bold">
                  {venture.Descr_obr}
                </span>
                <span className="hidden text-xs font-bold">{venture.Identificador_unid}</span>*/}
                <span className="col-span-6 md:col-span-5 lg:col-span-3 xl:col-span-2 inline-flex justify-end items-center gap-1 text-xs font-bold">
                  <input
                    type="text"
                    placeholder="Ano"
                    className="rounded-full px-4 py-1 md:px-6 md:py-2 w-20 outline-none border-2"
                    value={year}
                    onChange={handleChangeYear}
                    maxLength={4}
                  />

                  <button
                    onClick={() =>
                      handleIRPFSearch(
                        String(venture.Num_Ven),
                        venture.Obra_Ven,
                        String(venture.Empresa_ven)
                      )
                    }
                    className="px-4 py-1 md:px-6 md:py-2 bg-slate-200 border-2 border-slate-200 rounded-full hover:border-black hover:bg-black hover:text-white"
                  >
                    IRPF
                  </button>
                </span>
              </div>
            )
          }
        })}
      </Box>
    </TemplateDashboard>
  )
}

export default StatementsPage
