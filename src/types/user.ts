export type UserSession = {
  code: number
  name: string
  token: string
  username: string
  isLogged: boolean
}

export type UserPersonalData = {
  cpf: string
  nome: string
  email: string
  login: string
  senha: string
  dtnasc: Date
  codigo: number
}

export type UserPhoneData = {
  ddd: string
  tipo: number
  ramal: string
  codigo: number
  numero: string
}

export type UserAddressData = {
  uf: string
  cep: string
  codPes: number
  numero: string
  bairro: string
  cidade: string
  endereco: string
  referencia: string
  complemento: string
  tipoEndereco: number
}

export type ApiResponseUserLogged = [
  { dadospessoais: UserPersonalData[] },
  { dadostelefone: UserPhoneData[] },
  { dadosendereco: UserAddressData[] }
]
