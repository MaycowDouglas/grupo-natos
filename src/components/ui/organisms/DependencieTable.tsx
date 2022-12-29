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
  const [total, setTotal] = useState<number>(0)
  const [dependencies, setDependencies] = useState([])
  const installments = useDependencies(user, sale, company, building)

  useEffect(() => {
    if (!installments.isLoading) {
      let totalReaj = 0

      const filteredInstallments = installments.data.filter((installment: any, index: number) => {
        if (new Date(installment.Data_Prc) < new Date()) {
          totalReaj += installment.ValorReaj
          return installment
        }
      })

      setTotal(totalReaj)
      setDependencies(filteredInstallments)
    }
  }, [installments.data, installments.isLoading])

  return (
    <table className="w-full mt-10">
      <thead>
        <tr className="text-left">
          <th className="pb-3 hidden md:table-cell text-gray-500 font-medium">Venda</th>
          <th className="pb-3 md:table-cell text-gray-500 font-medium">Vencimento</th>
          <th className="pb-3 hidden md:table-cell text-gray-500 font-medium">Unidade</th>
          <th className="pb-3 hidden md:table-cell text-gray-500 font-medium">Valor da Parcela</th>
          <th className="pb-3 text-gray-500 font-medium">Valor da Reajustado</th>
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
              <>
                <tr key={index} className="">
                  <td className="py-2 hidden md:table-cell text-sm font-medium">{sale}</td>
                  <td className="py-2 md:table-cell text-sm font-medium">
                    {date.ISOStringToNormalDate(dependencie.Data_Prc)}
                  </td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">{venture}</td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    R$ {dependencie.Valor_Prc}
                  </td>
                  <td className="py-2 lg:table-cell text-sm font-medium">
                    R$ {dependencie.ValorReaj}
                  </td>
                </tr>

                {index === dependencies.length - 1 && (
                  <tr key={index} className="border-t-2">
                    <td
                      colSpan={3}
                      className="py-2 hidden md:table-cell text-sm font-medium uppercase"
                    ></td>
                    <td className="py-2 text-sm font-medium uppercase">Total</td>
                    <td className="py-2 lg:table-cell text-sm font-medium">
                      R$ {total.toFixed(2)}
                    </td>
                  </tr>
                )}
              </>
            )
          })
        )}
      </tbody>
    </table>
  )
}
