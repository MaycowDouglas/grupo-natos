import { theme } from '~/styles/theme'
import { ButtonProps } from '~/types/components'
import { classNames } from '~/utils/classNames'

export const Button = ({
  color = 'blue',
  className = '',
  children,
  isOutline = false,
  ...rest
}: ButtonProps) => {
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
    <button className={`${style}`} {...rest}>
      {children}
    </button>
  )
}
