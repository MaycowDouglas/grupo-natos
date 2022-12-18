import { theme } from '~/styles/theme'
import { HeadingProps } from '~/types/components'
import { classNames } from '~/utils/classNames'

export const Heading = ({ size = 30, level = 2, className = '', children }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const style = classNames(theme.heading.defaults, theme.heading.size[size], className)

  return <Tag className={style}>{children}</Tag>
}
