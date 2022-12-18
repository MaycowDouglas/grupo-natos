import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react'

import { availableMasks } from '~/utils/masks'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'red' | 'yellow' | 'green' | 'blue' | 'white' | 'black'
  isOutline?: boolean
}

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  color?: 'red' | 'yellow' | 'green' | 'blue' | 'white' | 'black'
  isOutline?: boolean
}

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: 20 | 24 | 30 | 36 | 48
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: 12 | 14 | 16 | 18 | 20
  isMuted?: boolean
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mask?: availableMasks
}

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {}
