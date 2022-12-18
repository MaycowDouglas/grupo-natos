import Link from 'next/link'

import { theme } from '~/styles/theme'
import { ButtonLinkProps } from '~/types/components'
import { classNames } from '~/utils/classNames'

export const ButtonLink = ({
  href = '',
  color = 'blue',
  className = '',
  children,
  isOutline = false,
  ...rest
}: ButtonLinkProps) => {
  const { button } = theme
  const style = classNames(
    button.box,
    button.border[color],
    isOutline ? button.background.outline : button.background.fill[color],
    isOutline ? button.text.outline[color] : button.text.fill,
    button.defaults,
    className
  )

  return (
    <Link href={href} legacyBehavior>
      <a className={`${style}`} {...rest}>
        {children}
      </a>
    </Link>
  )
}
