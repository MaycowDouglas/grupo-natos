import Image from 'next/image'
import { useRouter } from 'next/router'

import { TemplateDashboard } from '~/components/templates/Dashboard'
import { Box } from '~/components/ui/atoms/Box'
import { Heading } from '~/components/ui/atoms/Heading'
import usePostBySlug from '~/hooks/usePostBySlug'
import useUser from '~/hooks/useUser'
import { date } from '~/utils/date'

const PostPage = () => {
  const { user } = useUser()
  const { slug } = useRouter().query
  const { post, isLoading } = usePostBySlug(user, String(slug))
  const { ISOStringToNormalDate } = date

  return (
    <TemplateDashboard title="Notícia" description="Notícia">
      <Box>
        {isLoading ? (
          <p>carregando...</p>
        ) : (
          <div className="relative flex flex-col lg:flex-row gap-10 max-w-[1536px]">
            <div className="relative lg:w-1/2">
              <div className="sticky top-5 rounded-xl overflow-hidden">
                <Image
                  src={String(post?.featuredImage.node.sourceUrl)}
                  width={768}
                  height={384}
                  alt=""
                />
              </div>
            </div>
            <div className="pr-2 pb-7 lg:w-1/2">
              <span className="text-gray-500">{ISOStringToNormalDate(String(post?.date))}</span>
              <Heading size={24} className="mt-3 mb-6 lg:text-3xl">
                {post?.title}
              </Heading>
              <div
                className="space-y-5 xl:text-lg"
                dangerouslySetInnerHTML={{ __html: String(post?.content) }}
              />
            </div>
          </div>
        )}
      </Box>
    </TemplateDashboard>
  )
}

export default PostPage
