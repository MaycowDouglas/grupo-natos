export type UserSession = {
  code: number
  name: string
  email: string
  token: string
  phones: UserPhoneData[]
  document: string
  username: string
  birthdate: Date
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

export type UserVentures = {
  Empresa_ven: number
  Obra_Ven: string
  Num_Ven: number
  Cliente_Ven: number
  Contrato_Ven: number
  Nome_pes: string
  Descr_obr: string
  EmiteBoleto_CVen: boolean
  Identificador_unid: string
  Empreendimento_ven: string
}

export type UserVenturesAPIResponse = [{ MyTable: UserVentures[] }]
