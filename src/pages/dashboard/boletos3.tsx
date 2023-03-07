import 'swiper/css'

import Image from 'next/image'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { AiOutlineBarcode, AiOutlineLike, AiOutlineQrcode } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Button } from '~/components/ui/atoms/Button'
import { BoletoTable } from '~/components/ui/organisms/BoletoTable'
import useBoletos from '~/hooks/useBoletos'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'
import fetchJson from '~/lib/fetchJson'

export default function BoletosPage() {
  const { user } = useUser()
  const boletos = useBoletos(user)
  const ventures = useVentures(user)

  const [selectedTab, setTab] = useState<number>(0)
  const [pdfLink, setPdfLink] = useState<string[]>([])
  const [pixImage, setPixImage] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(true)
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)
  const [modalPixIsVisible, setModalPixVisibility] = useState<boolean>(false)

  useEffect(() => {
    nProgress.start()

    if (!ventures.isLoading && !boletos.isLoading) {
      setLoading(false)
    }

    if (!isLoading) {
      if (ventures.data && ventures.data.length > 1) {
        setTab(ventures.data[1].Num_Ven)
      }

      nProgress.done()
    }

    nProgress.done()
  }, [boletos.isLoading, ventures.data, ventures.isLoading, isLoading])

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

  async function getPixImage(
    company: number,
    building: string,
    sale: number,
    installment: number,
    generalInstallment: number
  ): Promise<string> {
    try {
      type PixByInstallmentResponse = {
        Obra: string
        Venda: number
        Empresa: number
        TipoParcela: string
        NumeroParcela: number
        NumeroParcelaGeral: number
        RetornoBancario: []
      }[]
      const pixByInstallment: PixByInstallmentResponse = await fetchJson(
        '/api/pix/by-installment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company, building, sale, installment, generalInstallment }),
        }
      )

      console.log(pixByInstallment)

      if (pixByInstallment[0].RetornoBancario.length === 0) {
        const generatePix: any = await fetchJson('/api/pix/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company, building, sale, installment, generalInstallment }),
        })

        console.log(generatePix)
      }

      return ''
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

  async function handleViewPix(
    company: number,
    building: string,
    sale: number,
    installment: number,
    generalInstallment: number
  ) {
    nProgress.start()
    const response = await getPixImage(company, building, sale, installment, generalInstallment)
    setPixImage(response)
    setModalPixVisibility(true)
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

      <Box
        className={`${
          modalPixIsVisible ? 'absolute' : 'hidden'
        } z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-4/5 lg:w-1/3 pt-14`}
      >
        <FaTimes
          className="absolute top-5 right-5 text-xl cursor-pointer"
          onClick={() => setModalPixVisibility(false)}
        />
        {/* {pixImage !== '' && <Image src={pixImage} alt="" className="w-full h-full" />} */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="data:image/png;base64,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"
          alt=""
          className="w-4/5 h-auto mx-auto"
        />
      </Box>

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
          {boletos.data && ventures.data && boletos.data.length > 0 ? (
            <Box>
              <Swiper spaceBetween={10} slidesPerView="auto">
                {ventures.data?.map((venture, index) => {
                  return (
                    index > 0 && (
                      <SwiperSlide key={index} className="max-w-xs px-5 md:max-w-sm">
                        <Button
                          className="text-xs"
                          isOutline={selectedTab !== venture.Num_Ven}
                          onClick={() => setTab(venture.Num_Ven)}
                        >
                          {venture.Empreendimento_ven}
                        </Button>
                      </SwiperSlide>
                    )
                  )
                })}
              </Swiper>
              {ventures.data?.map((venture, index) => {
                return (
                  index > 0 && (
                    <BoletoTable
                      key={index}
                      show={selectedTab === venture.Num_Ven}
                      venture={venture}
                      boletos={boletos.data}
                      handleViewPix={handleViewPix}
                      handleViewBoleto={handleViewBoleto}
                    />
                  )
                )
              })}
              {/* <table className="w-full text-left mt-10">
                <thead>
                  <tr className="">
                    <th className="py-1 px-2 text-gray-500 font-medium">Vencimento</th>
                    <th className="py-1 px-2 text-gray-500 font-medium">Empresa</th>
                    <th className="py-1 px-2 hidden lg:table-cell text-gray-500 font-medium">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boletos.data.map((boleto, index) => {
                    const next3Months = new Date()
                    next3Months.setMonth(next3Months.getMonth() + 3)

                    if (
                      new Date(boleto.dataVencimento) < next3Months &&
                      boleto.numeroVenda === selectedTab
                    ) {
                      return (
                        <tr key={index}>
                          <td className={`py-1 px-2 text-sm font-medium`}>
                            {new Date(boleto.dataVencimento).toLocaleDateString()}
                          </td>
                          <td className={`py-1 px-2 text-sm font-medium`}>{boleto.codEmpresa}</td>
                          <td className={`py-1 px-2 text-sm font-medium`}>
                            R$ {boleto.valorDocumento}
                          </td>
                          <td className="py-1 px-2 text-sm ">
                            <Button
                              className="py-1"
                              onClick={() => handleViewBoleto(boleto.codBanco, boleto.seuNumero)}
                            >
                              Visualizar
                            </Button>
                          </td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table> */}
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
