import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean
  isExternal?: boolean
}

export const NavLink = ({
  href = '',
  isActive = false,
  isExternal = false,
  className,
  children,
  ...rest
}: Props) => {
  return isExternal ? (
    <a
      rel="noopener noreferrer"
      href={href}
      target="_blank"
      className={`flex items-center gap-4 text-lg ${className} ${
        isActive ? 'text-white' : 'text-stone-600'
      }`}
    >
      {children}
    </a>
  ) : (
    <Link href={href} legacyBehavior>
      <a
        className={`flex items-center gap-4 text-lg ${className} ${
          isActive ? 'text-white' : 'text-stone-600'
        }`}
      >
        {children}
      </a>
    </Link>
  )
}
