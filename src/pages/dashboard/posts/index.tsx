import { NextPage } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Heading } from '~/components/ui/atoms/Heading'
import { NewsCard } from '~/components/ui/molecules/NewsCard'
import useFeaturedPosts from '~/hooks/useFeaturedPosts'
import usePosts from '~/hooks/usePosts'
import useUser from '~/hooks/useUser'

import 'swiper/css'

const PostsPage: NextPage = () => {
  const { user } = useUser()
  const allPosts = usePosts(user)
  const featuredPosts = useFeaturedPosts(user)

  return (
    <TemplateDashboard title="Notícias" description="Todos as notícias">
      <Box>
        <Heading className="mb-5">Destaques</Heading>
        <Swiper spaceBetween={20} slidesPerView="auto">
          {featuredPosts.isLoading ? (
            <p>carregando...</p>
          ) : (
            featuredPosts.posts?.map((post, index) => {
              return (
                index < 4 && (
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
                index < 4 && (
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
              )
            })
          )}
        </Swiper>
      </Box>
    </TemplateDashboard>
  )
}

export default PostsPage
