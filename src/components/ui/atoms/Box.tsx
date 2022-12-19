import { HTMLAttributes } from 'react'

import { classNames } from '~/utils/classNames'

export const Box = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames(
        'm-5 p-5 rounded-xl shadow-[0_0_26px_rgba(0,0,0,0.11)] bg-white',
        String(className)
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
