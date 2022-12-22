import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Button } from '~/components/ui/atoms/Button'
import { ButtonLink } from '~/components/ui/atoms/ButtonLink'
import { Text } from '~/components/ui/atoms/Text'
import { DependencieTable } from '~/components/ui/organisms/DependencieTable'
import useUser from '~/hooks/useUser'
import useVentures from '~/hooks/useVentures'

import 'swiper/css'

const DependenciesPage = () => {
  const { user } = useUser()
  const ventures = useVentures(user)

  const [isLoading, setLoading] = useState(true)
  const [selectedTab, setTab] = useState<string>('')

  useEffect(() => {
    nProgress.start()

    if (!ventures.isLoading) {
      setLoading(false)
    }

    if (!isLoading) {
      if (ventures.data && ventures.data.length > 1) {
        setTab(ventures.data[1].Descr_obr)
      }

      nProgress.done()
    }
  }, [ventures.isLoading, ventures.data, isLoading])

  return (
    <TemplateDashboard title="Pendências" description="Todos as pendências">
      {!isLoading && (
        <>
          {ventures.data && ventures.data.length > 1 ? (
            <>
              <Box className="lg:max-h-[400px] overflow-y-auto">
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

                {ventures.data?.map((venture, index) => {
                  return (
                    index > 0 && (
                      <DependencieTable
                        key={index}
                        venture={venture.Identificador_unid}
                        sale={venture.Num_Ven}
                        company={venture.Empresa_ven}
                        building={venture.Obra_Ven}
                      />
                    )
                  )
                })}
              </Box>
              <Box className="bg-slate-300">
                <div className="grid grid-cols-12 itens-center p-5">
                  <Text className="col-span-6 text-gray-600">
                    Prezado cliente, lembre-se que após 3 parcelas não pagas você terá que entrar em
                    contato com nossa equipe de suporte para renegociar seu pagamento.
                  </Text>
                  <div className="col-span-6 text-right">
                    <ButtonLink href="tel:(62)3121-7123" className="">
                      Fale Conosco
                    </ButtonLink>
                  </div>
                </div>
              </Box>
            </>
          ) : (
            <div className="w-full h-96 flex justify-center items-end">
              <div className="flex flex-col items-center opacity-40 text-center">
                <AiOutlineLike className="text-slate-600 text-9xl" />
                <h2 className="text-3xl font-medium text-slate-600">
                  Você não possui pagamentos pendentes!
                </h2>
              </div>
            </div>
          )}
        </>
      )}
    </TemplateDashboard>
  )
}

export default DependenciesPage
