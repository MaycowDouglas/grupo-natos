import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { BsArrowRight, BsFillTelephoneFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Heading } from '~/components/ui/atoms/Heading'
import { Text } from '~/components/ui/atoms/Text'
import { NewsCard } from '~/components/ui/molecules/NewsCard'
import useBoletos from '~/hooks/useBoletos'
import useFeaturedPosts from '~/hooks/useFeaturedPosts'
import usePosts from '~/hooks/usePosts'
import useUser from '~/hooks/useUser'

import 'swiper/css'

const PostsPage: NextPage = () => {
  const { user } = useUser()
  const allPosts = usePosts(user)
  const featuredPosts = useFeaturedPosts(user)
  const boletos = useBoletos(user)
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)

  useEffect(() => {
    if (boletos.data && boletos.data.length > 3) {
      setModalVisibility(true)
    }
  }, [boletos.data])

  return (
    <TemplateDashboard title="Notícias" description="Todos as notícias">
      {modalIsVisible && (
        <Box className="relative bg-slate-300">
          <div className="flex flex-col md:flex-row md:px-5 gap-5 justify-between items-center text-center md:text-left">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setModalVisibility(false)}
            />
            <div>
              <Heading size={24}>Pagamento Pendente!</Heading>
              <Text isMuted>Clique aqui para verificar sua pendências</Text>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/dependencies" legacyBehavior>
                  <a className="inline-flex justify-center items-center gap-2 text-blue-700 font-medium">
                    Ver pendências <BsArrowRight className="text-lg" strokeWidth={1} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      )}

      <Box>
        <Heading className="mb-5">Destaques</Heading>
        <Swiper spaceBetween={20} slidesPerView="auto">
          {featuredPosts.isLoading ? (
            <p>carregando...</p>
          ) : (
            featuredPosts.posts?.map((post, index) => {
              return (
                <SwiperSlide className="max-w-xs" key={String(index)}>
                  <NewsCard
                    slug={post.slug}
                    date={`${new Date(post.date).getDate()}/${
                      new Date(post.date).getMonth() + 1
                    }/${new Date(post.date).getFullYear()}`}
                    title={post.title}
                    image={post.featuredImage.node.sourceUrl}
                  />
                </SwiperSlide>
              )
            })
          )}
        </Swiper>
      </Box>

      <Box>
        <Heading className="mb-5">Notícias passadas</Heading>
        <Swiper spaceBetween={20} slidesPerView="auto">
          {allPosts.isLoading ? (
            <p>carregando...</p>
          ) : (
            allPosts.posts?.map((post, index) => {
              return (
                <SwiperSlide className="max-w-xs" key={String(index)}>
                  <NewsCard
                    slug={post.slug}
                    date={`${new Date(post.date).getDate()}/${
                      new Date(post.date).getMonth() + 1
                    }/${new Date(post.date).getFullYear()}`}
                    title={post.title}
                    image={post.featuredImage.node.sourceUrl}
                    isOld
                  />
                </SwiperSlide>
              )
            })
          )}
        </Swiper>
      </Box>
    </TemplateDashboard>
  )
}

export default PostsPage
