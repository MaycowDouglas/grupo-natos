import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { AiOutlineBarcode, AiOutlineLike, AiOutlineQrcode } from 'react-icons/ai'

import useBoletos from '~/hooks/useBoletos'
import useDependencies from '~/hooks/useDependencies'
import useUser from '~/hooks/useUser'
import fetchJson from '~/lib/fetchJson'
import { UserVentures } from '~/types/user'
import { classNames } from '~/utils/classNames'

type Props = {
  show: boolean
  venture: UserVentures
}

export default function DependencieTable({ venture, show = false }: Props) {
  const { user } = useUser()
  const installments = useDependencies(user, venture.Num_Ven, venture.Empresa_ven, venture.Obra_Ven)

  const [total, setTotal] = useState<number>(0)
  const [dependencies, setDependencies] = useState([])

  useEffect(() => {
    if (!installments.isLoading) {
      let totalReaj = 0
      const nextMounth = new Date()
      nextMounth.setMonth(nextMounth.getMonth() + 1)

      const filteredInstallments = installments.data.filter((installment: any) => {
        if (new Date(installment.Data_Prc) < nextMounth) {
          totalReaj +=
            new Date(installment.Data_Prc) > new Date()
              ? installment.Valor_Prc
              : installment.ValorReaj
          return installment
        }
      })

      setTotal(totalReaj)
      setDependencies(filteredInstallments)
    }
  }, [installments.data, installments.isLoading])

  if (!installments.isLoading && installments.data.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-end">
        <div className="flex flex-col items-center opacity-40 text-center">
          <AiOutlineLike className="text-slate-600 text-9xl" />
          <h2 className="text-3xl font-medium text-slate-600">
            Você não possui pagamentos pendentes!
          </h2>
        </div>
      </div>
    )
  }

  return show ? (
    <table className="w-full mt-10">
      <thead>
        <tr className="text-left">
          <th className="pb-3 hidden md:table-cell text-gray-500 font-medium">Nº Venda</th>
          <th className="pb-3 hidden md:table-cell text-gray-500 font-medium">Nº Parcela</th>
          <th className="pb-3 md:table-cell text-gray-500 font-medium">Vencimento</th>
          <th className="pb-3 md:table-cell text-gray-500 font-medium">Valor</th>
          <th className="pb-3 md:table-cell text-gray-500 font-medium">Valor reajustado</th>
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
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    {venture.Num_Ven}
                  </td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    {dependencie.NumParc_Prc}
                  </td>
                  <td className="py-2 md:table-cell text-sm font-medium">
                    {new Date(dependencie.Data_Prc).toLocaleDateString()}
                  </td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    R$ {dependencie.Valor_Prc}
                  </td>
                  <td className="py-2 hidden md:table-cell text-sm font-medium">
                    R${' '}
                    {new Date(dependencie.Data_Prc) > new Date()
                      ? dependencie.Valor_Prc
                      : dependencie.ValorReaj}
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
  ) : (
    <></>
  )
}
