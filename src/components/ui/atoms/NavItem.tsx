import { LiHTMLAttributes } from 'react'

export const NavItem = ({ className, children }: LiHTMLAttributes<HTMLLIElement>) => {
  return <li className={`px-3 py-5 ${className}`}>{children}</li>
}
