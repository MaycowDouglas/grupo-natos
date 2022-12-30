import Image from 'next/image'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Button } from '~/components/ui/atoms/Button'
import { Heading } from '~/components/ui/atoms/Heading'
import useUser from '~/hooks/useUser'
import useVenturesContent from '~/hooks/useVenturesContent'

import 'swiper/css'
import 'swiper/css/pagination'

const PostPage = () => {
  const { user } = useUser()
  const ventures = useVenturesContent(user)

  const [isLoading, setLoading] = useState(true)
  const [selectedTab, setTab] = useState<number>(0)

  useEffect(() => {
    nProgress.start()

    if (!ventures.isLoading) {
      setLoading(false)
    }

    nProgress.done()
    nProgress.remove()
  }, [ventures.isLoading])

  return (
    <TemplateDashboard title="Empreendimentos" description="Empreendimentos">
      <Box>
        {isLoading ? (
          <p>carregando...</p>
        ) : (
          <>
            <Swiper spaceBetween={10} slidesPerView="auto">
              {ventures.content?.map((venture, index) => {
                return (
                  <SwiperSlide key={index} className="max-w-[200px]">
                    <Button
                      className="w-full text-xs"
                      onClick={() => setTab(index)}
                      isOutline={selectedTab !== index}
                    >
                      {venture.title}
                    </Button>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <div className="relative flex flex-col lg:flex-row gap-10 max-w-[1536px] mt-10">
              <div className="relative lg:w-1/2">
                <div className="sticky top-5">
                  <Swiper
                    className="rounded-xl overflow-hidden"
                    spaceBetween={10}
                    slidesPerView="auto"
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <iframe
                        className="w-full h-96"
                        src={ventures.content?.[selectedTab].video}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </SwiperSlide>
                    {ventures.content?.[selectedTab].images.nodes.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative">
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)]"></div>
                          <Image src={image.sourceUrl} width={768} height={384} alt="" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Heading level={3} className="mt-6 mb-3">
                    Documentos
                  </Heading>
                  <ul>
                    {ventures.content?.[selectedTab].documents.nodes.map((document, index) => (
                      <li key={index}>
                        <a
                          rel="noreferrer"
                          href={document.mediaItemUrl}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-blue-700"
                          download
                        >
                          <FiDownload /> {document.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pr-2 pb-7 lg:w-1/2">
                <Heading size={24} className="mt-3 mb-6 lg:text-3xl">
                  {ventures.content?.[selectedTab].title}
                </Heading>
                <div
                  className="space-y-5 xl:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: String(ventures.content?.[selectedTab].content),
                  }}
                />
              </div>
            </div>
          </>
        )}
      </Box>
    </TemplateDashboard>
  )
}

export default PostPage
