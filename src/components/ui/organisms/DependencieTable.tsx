import { useEffect, useState } from 'react'

import useDependencies from '~/hooks/useDependencies'
import useUser from '~/hooks/useUser'
import { date } from '~/utils/date'

type Props = {
  sale: number
  venture: string
  company: number
  building: string
}

export const DependencieTable = ({ sale, venture, company, building }: Props) => {
  const { user } = useUser()
  const [dependencies, setDependencies] = useState([])
  const installments = useDependencies(user, sale, company, building)

  useEffect(() => {
    if (!installments.isLoading) {
      const filteredInstallments = installments.data.filter((installment: any, index: number) => {
        if (new Date(installment.Data_Prc) < new Date()) {
          return installment
        }
      })

      setDependencies(filteredInstallments)
    }
  }, [installments.isLoading])

  console.log(dependencies)

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left">
          <th className="pb-6 text-gray-500 font-medium">Vencimento</th>
          <th className="pb-6 hidden md:table-cell text-gray-500 font-medium">Empreendimento</th>
          <th className="pb-6 text-gray-500 font-medium">Valor</th>
          <th className="pb-6 ">
            <span className="invisible">Ação</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {installments.isLoading ? (
          <tr>
            <td className="text-center py-5" colSpan={7}>
              Carregando...
            </td>
          </tr>
        ) : (
          dependencies.map((dependencie: any, index) => {
            return (
              <tr key={index} className="">
                <td className="py-2 hidden md:table-cell text-sm font-medium">
                  {date.ISOStringToNormalDate(dependencie.Data_Prc)}
                </td>
                <td className="py-2 text-sm font-medium">{venture}</td>
                <td className="py-2 hidden lg:table-cell text-sm font-medium">
                  R$ {dependencie.Valor_Prc}
                </td>
              </tr>
            )
          })
        )}
      </tbody>

      {/* <tbody> */}
      {/* {boletos.isLoading ? (
          <tr>
            <td className="text-center py-5" colSpan={7}>
              Carregando...
            </td>
          </tr>
        ) : (
          boletos.data?.map((boleto, index) => {
            const due_date = new Date(boleto.dataVencimento)
            const issue_date = new Date(boleto.dataEmissao)

            const print_date = [
              {
                d: issue_date.getDate() < 10 ? '0' + issue_date.getDate() : issue_date.getDate(),
                m:
                  issue_date.getMonth() + 1 < 10
                    ? '0' + (issue_date.getMonth() + 1)
                    : issue_date.getMonth() + 1,
                y: issue_date.getFullYear(),
              },
              {
                d: due_date.getDate() < 10 ? '0' + due_date.getDate() : due_date.getDate(),
                m: due_date.getMonth() < 10 ? '0' + due_date.getMonth() : due_date.getMonth(),
                y: due_date.getFullYear(),
              },
            ]

            return (
              boleto.obraParcela === activeVenture && (
                <tr key={index} className="">
                  <td className="py-2 hidden md:table-cell text-sm font-medium">{`${print_date[0].d}/${print_date[0].m}/${print_date[0].y}`}</td>
                  <td className="py-2 text-sm font-medium">{`${print_date[1].d}/${print_date[1].m}/${print_date[1].y}`}</td>
                  <td className="py-2 hidden lg:table-cell text-sm font-medium">
                    {boleto.seuNumero}
                  </td>
                  <td className="py-2 hidden lg:table-cell text-sm font-medium">
                    {boleto.codBanco}
                  </td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    {boleto.descricaoObra}
                  </td>
                  <td className="py-2 text-sm font-medium">
                    <span>R$ {boleto.valorDocumento}</span>
                  </td>
                  <td className="py-2 ">
                    <button
                      onClick={() => handleViewBoleto(boleto.codBanco, boleto.seuNumero)}
                      className="px-3 py-2 rounded-full bg-blue-700 text-xs text-white"
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              )
            )
          })
        )}
      </tbody> */}
    </table>
  )
}
