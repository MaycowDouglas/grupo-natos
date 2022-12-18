import { theme } from '~/styles/theme'
import { TextProps } from '~/types/components'
import { classNames } from '~/utils/classNames'

export const Text = ({ isMuted, size = 16, className = '', children }: TextProps) => {
  const style = classNames(theme.text.size[size], isMuted ? theme.text.muted : '', className)

  return <p className={style}>{children}</p>
}
