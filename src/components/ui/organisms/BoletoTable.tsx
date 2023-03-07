import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineQrcode } from 'react-icons/ai'

import useDependencies from '~/hooks/useDependencies'
import useUser from '~/hooks/useUser'
import { Boleto } from '~/types/boleto'
import { UserVentures } from '~/types/user'

import { Button } from '../atoms/Button'

type Props = {
  show: boolean
  boletos?: Boleto[]
  venture: UserVentures
  handleViewPix: (
    company: number,
    building: string,
    sale: number,
    installment: number,
    generalInstallment: number
  ) => Promise<void>
  handleViewBoleto: (bank: number, numBoleto: number) => Promise<void>
}

export const BoletoTable = ({
  show = false,
  boletos,
  venture,
  handleViewPix,
  handleViewBoleto,
}: Props) => {
  const { user } = useUser()
  const installments = useDependencies(user, venture.Num_Ven, venture.Empresa_ven, venture.Obra_Ven)

  const [dependencies, setDependencies] = useState([])

  useEffect(() => {
    if (!installments.isLoading) {
      const nextMounth = new Date()
      nextMounth.setMonth(nextMounth.getMonth() + 1)

      const filteredInstallments = installments.data.filter((installment: any) => {
        if (new Date(installment.Data_Prc) < nextMounth) {
          return installment
        }
      })

      setDependencies(filteredInstallments)
    }
  }, [installments.data, installments.isLoading])

  return show ? (
    <table className="w-full text-left mt-10">
      <thead>
        <tr>
          <th className="py-1 px-2 text-gray-500 font-medium">Nº Parcela</th>
          <th className="py-1 px-2 text-gray-500 font-medium">Vencimento</th>
          <th className="py-1 px-2 text-gray-500 font-medium">Empresa</th>
          <th className="py-1 px-2 hidden lg:table-cell text-gray-500 font-medium">Valor</th>
        </tr>
      </thead>
      {boletos && (
        <tbody>
          {boletos.length > 3 ? (
            <>
              {boletos.map((boleto, index) => {
                const ii = installments.data.findIndex(
                  (installment: any) =>
                    new Date(installment.Data_Prc) === new Date(boleto.dataVencimento)
                )

                if (index + 1 === boletos.length) {
                  return (
                    <tr key={index}>
                      <td>{boleto.codEmpresa}</td>
                      <td>{ii}</td>
                    </tr>
                  )
                }
              })}
            </>
          ) : (
            <>
              {boletos.map((boleto, index) => {
                const i = installments.data.findIndex(
                  (installment: any) => installment.Data_Prc === boleto.dataVencimento
                )

                return (
                  <tr key={index}>
                    <td className={`py-1 px-2 text-sm`}>{installments.data[i].NumParc_Prc}</td>
                    <td className={`py-1 px-2 text-sm`}>
                      {new Date(boleto.dataVencimento).toLocaleDateString()}
                    </td>
                    <td className="py-1 px-2 text-sm">
                      <span>{boleto.descricaoEmpresa}</span>
                    </td>
                    <td className="py-1 px-2 text-sm">
                      <span>R$ {boleto.valorDocumento}</span>
                    </td>
                    <td className="py-1 px-2">
                      <span className="inline-flex items-center gap-3">
                        <AiOutlineQrcode
                          title="Gerar PIX"
                          className="text-xl cursor-pointer"
                          onClick={() =>
                            handleViewPix(
                              boleto.codEmpresa,
                              installments.data[i].Obra_Prc,
                              installments.data[i].Num_Ven,
                              installments.data[i].NumParc_Prc,
                              installments.data[i].NumParcGer_Prc
                            )
                          }
                        />
                        <Button
                          className="text-xs px-3"
                          onClick={() => handleViewBoleto(boleto.codBanco, boleto.seuNumero)}
                        >
                          Visualizar
                        </Button>
                      </span>
                    </td>
                  </tr>
                )
              })}
            </>
          )}
        </tbody>
      )}
    </table>
  ) : (
    <></>
  )

  // return show ? (
  //   <>
  //     {boletos !== undefined && boletos.length > 0 && dependencies.length > 0 && (
  //       <table className="w-full text-left mt-10">
  //         <thead>
  //           <tr className="">
  //             <th className="py-1 px-2 text-gray-500 font-medium">Nº Parcela</th>
  //             <th className="py-1 px-2 text-gray-500 font-medium">Vencimento</th>
  //             <th className="py-1 px-2 text-gray-500 font-medium">Empresa</th>
  //             <th className="py-1 px-2 hidden lg:table-cell text-gray-500 font-medium">Valor</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {boletos.map((boleto, index) => {
  //             const next2Months = new Date()
  //             next2Months.setDate(next2Months.getMonth() + 2)
  //             if (
  //               new Date(boleto.dataVencimento) < next2Months &&
  //               boleto.numeroVenda === venture.Num_Ven
  //             ) {
  //               const boletoDependency: any = dependencies.filter(
  //                 (dependency: any) => dependency.Data_Prc === boleto.dataVencimento
  //               )
  //               return (
  //                 <tr key={index}>
  //                   <td className={`py-1 px-2 text-sm`}>{boletoDependency[0].NumParc_Prc}</td>
  //                   <td className={`py-1 px-2 text-sm`}>
  //                     {new Date(boleto.dataVencimento).toLocaleDateString()}
  //                   </td>
  //                   <td className="py-1 px-2 text-sm">
  //                     <span>{boleto.agCodCedente}</span>
  //                   </td>
  //                   <td className="py-1 px-2 text-sm">
  //                     <span>R$ {boleto.valorDocumento}</span>
  //                   </td>
  //                   <td className="py-1 px-2">
  //                     <span className="inline-flex items-center gap-3">
  //                       <AiOutlineQrcode
  //                         title="Gerar PIX"
  //                         className="text-xl cursor-pointer"
  //                         onClick={() =>
  //                           handleViewPix(
  //                             boleto.codEmpresa,
  //                             boletoDependency[0].Obra_Prc,
  //                             boletoDependency[0].Num_Ven,
  //                             boletoDependency[0].NumParc_Prc,
  //                             boletoDependency[0].NumParcGer_Prc
  //                           )
  //                         }
  //                       />
  //                       <Button
  //                         className="text-xs px-3"
  //                         onClick={() => handleViewBoleto(boleto.codBanco, boleto.seuNumero)}
  //                       >
  //                         Visualizar
  //                       </Button>
  //                     </span>
  //                   </td>
  //                 </tr>
  //               )
  //             }
  //           })}
  //         </tbody>
  //       </table>
  //     )}
  //   </>
  // ) : (
  //   <></>
  // )
}
