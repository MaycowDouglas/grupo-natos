import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { title } from 'process'

import { classNames } from '~/utils/classNames'

export type NewsCardProps = {
  key?: string
  slug: string
  date: string
  title: string
  image: StaticImageData | string
  isOld?: boolean
}

const style = {
  defaults: {
    body: 'px-5 pt-3 pb-7 bg-blue-700',
    label: 'block mb-2 text-sm',
    heading: 'h-16 text-ellipsis overflow-hidden font-medium leading-5',
  },
  status: {
    new: {
      body: 'bg-blue-700',
      label: 'text-slate-300',
      heading: 'text-white',
    },
    old: {
      body: 'bg-white',
      label: 'text-gray-500',
      heading: 'text-black',
    },
  },
}

export const NewsCard = ({ key = '', slug, date, title, image, isOld }: NewsCardProps) => {
  let filterTitle =
    title.length > 50
      ? `${title
          .split(' ')
          .filter((word, index) => index < 10 && word)
          .toString()
          .replaceAll(',', ' ')}...`
      : title

  return (
    <Link href={`/dashboard/posts/${slug}`} key={key} legacyBehavior>
      <a>
        <div className="h-72 rounded-xl shadow-[0_0_26px_rgba(0,0,0,0.11)] overflow-hidden">
          <div className="relative w-full h-44">
            <Image src={image} alt="" fill className="object-cover" />
            {!isOld && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-xs font-medium">
                Destaques
              </span>
            )}
          </div>
          <div
            className={classNames(style.defaults.body, style.status[isOld ? 'old' : 'new'].body)}
          >
            <span
              className={classNames(
                style.defaults.label,
                style.status[isOld ? 'old' : 'new'].label
              )}
            >
              {date}
            </span>
            <p
              className={classNames(
                style.defaults.heading,
                style.status[isOld ? 'old' : 'new'].heading
              )}
            >
              {filterTitle}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}
