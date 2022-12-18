import { KeyboardEvent, useCallback } from 'react'

import { InputProps } from '~/types/components'
import handleFormMasks, { availableMasks } from '~/utils/masks'

export const Input = ({ mask, type, ...rest }: InputProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, mask: availableMasks) => handleFormMasks(e, mask),
    []
  )

  return (
    <input
      type={type}
      className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
      onKeyDown={(e) => {
        if (type === 'email') handleKeyDown(e, 'email')
        else if (mask !== undefined) handleKeyDown(e, mask)
      }}
      {...rest}
    />
  )
}
