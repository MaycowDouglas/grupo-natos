import nProgress from 'nprogress'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'
import fetchJson, { FetchError } from '~/lib/fetchJson'

const StatementsPage = () => {
  const downloadButton: any = useRef()

  const { user } = useUser()
  const ventures = useVentures(user)

  const [pdfLink, setPdfLink] = useState([''])
  const [year, setYear] = useState<string>('')
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)

  const handleChangeYear = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setYear(event.currentTarget.value.replace(/\D/g, ''))
  }, [])

  async function getIRPF(sale: string, building: string, company: string): Promise<string> {
    try {
      return await fetchJson('/api/irpf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sale, building, company }),
      })
    } catch (error) {
      return ''
    }
  }

  const handleIRPFSearch = async (sale: string, building: string, company: string) => {
    nProgress.start()

    if (year.length === 4) {
      const response = await getIRPF(sale, building, company)
      setPdfLink([`data:application/pdf;base64,${response}`])
      setModalVisibility(true)
    } else {
      alert('Informe o ano')
    }

    nProgress.done()
  }

  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    nProgress.start()

    if (!ventures.isLoading) {
      setLoading(false)
    }

    if (!isLoading) nProgress.done()
  }, [ventures.isLoading, ventures.data, isLoading])

  return (
    <TemplateDashboard title="Extratos" description="Todos os extratos">
      <Box
        className={`${
          modalIsVisible ? 'absolute' : 'hidden'
        } z-50 bottom-0 left-0 right-0 top-0 pt-14`}
      >
        <FaTimes
          className="absolute top-5 right-5 text-xl cursor-pointer"
          onClick={() => setModalVisibility(false)}
        />
        {pdfLink.length === 1 ? (
          <embed src={pdfLink[0]} className="w-full h-full" />
        ) : (
          <div className="flex flex-col gap-10">
            {pdfLink.map((link, index) => (
              <embed key={index} src={link} className="w-full h-full" />
            ))}
          </div>
        )}
      </Box>
      {!isLoading && (
        <>
          {ventures.data && ventures.data.length > 1 ? (
            <Box>
              <div className="grid grid-cols-12 items-center mb-5 md:space-x-5">
                <span className="hidden md:inline-grid text-sm font-medium text-gray-500">
                  Empresa
                </span>
                <span className="hidden md:inline-grid md:col-span-2 xl:col-span-1 text-sm font-medium text-gray-500">
                  Nº Contrato
                </span>
                <span className="hidden md:inline-grid lg:col-span-5 text-sm font-medium text-gray-500">
                  Empreendimento
                </span>
              </div>
              {ventures.data?.map((venture, index: number) => {
                if (index > 0) {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-12 justify-center items-center mb-10 md:space-x-5 my-3"
                    >
                      <span className="hidden md:inline-grid text-xs font-bold">
                        {venture.Empresa_ven}
                      </span>
                      <span className="hidden md:inline-grid md:col-span-2 xl:col-span-1 text-xs font-bold">
                        {venture.Num_Ven}
                      </span>
                      <span
                        className="
                          col-span-12 md:col-span-4 lg:col-span-5 xl:col-span-8
                          px-10 pb-3 md:px-0 md:pb-0 
                          text-center md:text-left 
                          text-xs font-bold
                        "
                      >
                        {venture.Empreendimento_ven}
                      </span>
                      <span
                        className="
                          inline-flex justify-center items-center gap-1 
                          col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-2 
                          text-xs font-bold
                        "
                      >
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
          ) : (
            <div className="w-full h-96 flex justify-center items-end">
              <div className="flex flex-col items-center opacity-40 text-center">
                <IoWarningOutline className="text-slate-600 text-9xl" />
                <h2 className="text-3xl font-medium text-slate-600">
                  Você não possui empreendimentos!
                </h2>
              </div>
            </div>
          )}
        </>
      )}
    </TemplateDashboard>
  )
}

export default StatementsPage

{
  /* <Box>
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
      </Box> */
}
