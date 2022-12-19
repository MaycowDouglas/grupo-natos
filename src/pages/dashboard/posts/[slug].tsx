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
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 md:max-h-[550px] md:overflow-auto">
            <div className="relative">
              <div className="sticky top-0 w-full h-48 md:h-60 lg:h-[400px] rounded-xl overflow-hidden">
                <Image src={String(post?.featuredImage.node.sourceUrl)} alt="" fill />
              </div>
            </div>
            <div className="pr-2 pb-7">
              <span className="text-gray-500">{ISOStringToNormalDate(String(post?.date))}</span>
              <Heading className="mt-3 mb-10">{post?.title}</Heading>
              <div
                className="space-y-5"
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
