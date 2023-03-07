import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Button } from '~/components/ui/atoms/Button'
import useBoletos from '~/hooks/useBoletos'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { date } from '~/utils/date'

import 'swiper/css'

const BoletosPage = () => {
  const { user } = useUser()
  const boletos = useBoletos(user)
  const ventures = useVentures(user)

  const [pdfLink, setPdfLink] = useState<string[]>([])
  const [selectedTab, setTab] = useState<string>('')
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)

  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    nProgress.start()

    if (!ventures.isLoading && !boletos.isLoading) {
      setLoading(false)
    }

    if (!isLoading) {
      if (ventures.data && ventures.data.length > 1) {
        setTab(ventures.data[1].Descr_obr)
      }

      nProgress.done()
    }
  }, [ventures.isLoading, ventures.data, boletos.isLoading, isLoading])

  async function getBoletoPDF(bank: number, numBoleto: number): Promise<string> {
    try {
      return await fetchJson('/api/boletos/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank, numBoleto }),
      })
    } catch (error) {
      return ''
    }
  }

  async function handleViewBoleto(bank: number, numBoleto: number) {
    nProgress.start()
    const response = await getBoletoPDF(bank, numBoleto)

    setPdfLink([`data:application/pdf;base64,${response}`])
    setModalVisibility(true)

    nProgress.done()
  }

  return (
    <TemplateDashboard title="Boletos" description="Todos os boletos">
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
          {boletos.data && boletos.data.length > 0 ? (
            <Box>
              <Swiper spaceBetween={20} slidesPerView="auto">
                {ventures.data?.map((venture, index) => {
                  return (
                    index > 0 && (
                      <SwiperSlide key={index} className="max-w-xs">
                        <Button className="text-xs" isOutline={selectedTab !== venture.Descr_obr}>
                          {venture.Empreendimento_ven}
                        </Button>
                      </SwiperSlide>
                    )
                  )
                })}
              </Swiper>
              <table className="w-full text-left mt-10">
                <thead>
                  <tr className="">
                    <th className="pb-1 hidden md:table-cell text-gray-500 font-medium">Emissão</th>
                    <th className="pb-1 text-gray-500 font-medium">Vencimento</th>
                    <th className="pb-1 hidden lg:table-cell text-gray-500 font-medium">Número</th>
                    <th className="pb-1 hidden lg:table-cell text-gray-500 font-medium">Banco</th>
                    <th className="pb-1 hidden lg:table-cell text-gray-500 font-medium">Empresa</th>
                    <th className="pb-1 text-gray-500 font-medium">Valor</th>
                    <th className="pb-1">
                      <span className="invisible">Ação</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boletos.data.length > 4 ? (
                    <>
                      {boletos.data.map((boleto, index) => {
                        const today = new Date()
                        const issueDate = new Date(boleto.dataEmissao)

                        return (
                          boleto.descricaoObra === selectedTab && (
                            <tr key={index}>
                              {issueDate.getMonth() !== today.getMonth() ? (
                                <>
                                  <td
                                    className={`py-2 hidden md:table-cell text-sm font-medium text-red-500`}
                                  >
                                    {date.ISOStringToNormalDate(boleto.dataEmissao)}
                                  </td>
                                  <td className={`py-2 text-sm font-medium text-red-500`}>
                                    {date.ISOStringToNormalDate(boleto.dataVencimento)}
                                  </td>
                                  <td className="py-2 hidden lg:table-cell text-sm font-medium text-red-500">
                                    {boleto.seuNumero}
                                  </td>
                                  <td className="py-2 hidden lg:table-cell text-sm font-medium text-red-500">
                                    {boleto.nomeBanco}
                                  </td>
                                  <td className="py-2 text-sm font-medium text-red-500">
                                    <span>{boleto.descricaoEmpresa}</span>
                                  </td>
                                  <td className="py-2 text-sm font-medium text-red-500">
                                    <span>R$ {boleto.valorDocumento}</span>
                                  </td>
                                  <td className="py-2 ">
                                    <Button
                                      className="text-xs px-3"
                                      onClick={() =>
                                        handleViewBoleto(boleto.codBanco, boleto.seuNumero)
                                      }
                                    >
                                      Visualizar
                                    </Button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className={`py-2 hidden md:table-cell text-sm font-medium`}>
                                    {date.ISOStringToNormalDate(boleto.dataEmissao)}
                                  </td>
                                  <td className={`py-2 text-sm font-medium`}>
                                    {date.ISOStringToNormalDate(boleto.dataVencimento)}
                                  </td>
                                  <td className="py-2 hidden lg:table-cell text-sm font-medium">
                                    {boleto.seuNumero}
                                  </td>
                                  <td className="py-2 hidden lg:table-cell text-sm font-medium">
                                    {boleto.nomeBanco}
                                  </td>
                                  <td className="py-2 text-sm font-medium">
                                    <span>{boleto.descricaoEmpresa}</span>
                                  </td>
                                  <td className="py-2 text-sm font-medium">
                                    <span>R$ {boleto.valorDocumento}</span>
                                  </td>
                                  <td className="py-2 ">
                                    <Button
                                      className="text-xs px-3"
                                      onClick={() =>
                                        handleViewBoleto(boleto.codBanco, boleto.seuNumero)
                                      }
                                    >
                                      Visualizar
                                    </Button>
                                  </td>
                                </>
                              )}
                            </tr>
                          )
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className={`py-2 hidden md:table-cell text-sm font-medium`}>
                          {date.ISOStringToNormalDate(
                            boletos.data[boletos.data.length - 1].dataEmissao
                          )}
                        </td>
                        <td className={`py-2 text-sm font-medium`}>
                          {date.ISOStringToNormalDate(
                            boletos.data[boletos.data.length - 1].dataVencimento
                          )}
                        </td>
                        <td className="py-2 hidden lg:table-cell text-sm font-medium">
                          {boletos.data[boletos.data.length - 1].seuNumero}
                        </td>
                        <td className="py-2 hidden lg:table-cell text-sm font-medium">
                          {boletos.data[boletos.data.length - 1].nomeBanco}
                        </td>
                        <td className="py-2 hidden lg:table-cell text-sm font-medium">
                          <span>{boletos.data[boletos.data.length - 1].descricaoEmpresa}</span>
                        </td>
                        <td className="py-2 text-sm font-medium">
                          <span>R$ {boletos.data[boletos.data.length - 1].valorDocumento}</span>
                        </td>
                        <td className="py-2 ">
                          <Button
                            className="text-xs px-3"
                            onClick={() =>
                              handleViewBoleto(
                                parseInt(String(boletos.data?.[boletos.data.length - 1].codBanco)),
                                parseInt(String(boletos.data?.[boletos.data.length - 1].seuNumero))
                              )
                            }
                          >
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </Box>
          ) : (
            <div className="w-full h-96 flex justify-center items-end">
              <div className="flex flex-col items-center opacity-40 text-center">
                <AiOutlineLike className="text-slate-600 text-9xl" />
                <h2 className="text-3xl font-medium text-slate-600">
                  Você não possui boletos em aberto!
                </h2>
              </div>
            </div>
          )}
        </>
      )}
    </TemplateDashboard>
  )
}

export default BoletosPage
