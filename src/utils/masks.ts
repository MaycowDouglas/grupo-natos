import { KeyboardEvent } from 'react'

export type availableMasks = 'email' | 'phone' | 'cpf' | 'cnpj'

export const masks = {
  phone: (value: string) => {
    // output => (99) 99999-9999
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
  },
  cpf: (value: string) => {
    // output => 999.999.999-99
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
  },
  cnpj: (value: string) => {
    // output => 99.999.999/0001-99
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  },
}

export default function handleFormMasks(e: KeyboardEvent<HTMLInputElement>, mask: availableMasks) {
  switch (mask) {
    case 'cpf':
      e.currentTarget.minLength = 14
      e.currentTarget.maxLength = 14
      e.currentTarget.value = masks.cpf(e.currentTarget.value)
      break

    case 'cnpj':
      e.currentTarget.minLength = 18
      e.currentTarget.maxLength = 18
      e.currentTarget.value = masks.cnpj(e.currentTarget.value)
      break

    case 'phone':
      e.currentTarget.minLength = 15
      e.currentTarget.maxLength = 15
      e.currentTarget.value = masks.phone(e.currentTarget.value)
      break

    case 'email':
      e.currentTarget.value = e.currentTarget.value.toLowerCase()
      break

    default:
      break
  }
}
