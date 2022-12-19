import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { FaTimes } from 'react-icons/fa'

import { BarcodeIcon, FileIcon, FilePlusIcon, HomeIcon } from '~/components/ui/atoms/Icons'
import { NavItem } from '~/components/ui/atoms/NavItem'
import { NavLink } from '~/components/ui/atoms/NavLink'
import useUser from '~/hooks/useUser'
import BrandNatosN from '~/public/images/brands/natos-n.png'
import BrandNatos from '~/public/images/brands/natos.png'

type Props = {
  isOpen: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  pathname: string
}

export const DashboardSidebar = ({ isOpen, onClick, pathname }: Props) => {
  const { user } = useUser()
  const navigation = [
    {
      icon: <HomeIcon />,
      link: '/dashboard/posts',
      label: 'Notícias',
      activeCodition: pathname.includes('/dashboard/posts'),
    },
    {
      icon: <BarcodeIcon />,
      link: `/dashboard/user/${user?.code}/boletos`,
      label: 'Boletos',
      activeCodition: pathname.includes('/dashboard/boletos'),
    },
    {
      icon: <FileIcon />,
      link: `/dashboard/user/${user?.code}/statements`,
      label: 'Extrato',
      activeCodition: pathname.includes('/dashboard/statements'),
    },
    {
      icon: <FilePlusIcon />,
      link: `/dashboard/user/${user?.code}/dependencies`,
      label: 'Pendências',
      activeCodition: pathname.includes('/dashboard/dependencies'),
    },
  ]

  return (
    <aside
      className={`absolute top-0 left-0 bottom-0 w-fit p-5 h-screen bg-stone-900 z-20 transition-all
          lg:sticky lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
    >
      <div className="flex items-start justify-between">
        <Link href="/dashboard/posts" legacyBehavior>
          <a>
            <Image src={BrandNatos} className="hidden lg:block" alt="" />
            <Image src={BrandNatosN} className="lg:hidden" alt="" />
          </a>
        </Link>

        <button onClick={onClick} className="lg:hidden p-2 rounded-full bg-slate-800 text-white">
          <FaTimes />
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-stone-600 font-medium">Menu</h2>
        <ul>
          {navigation.map((item, index) => (
            <NavItem key={index} className="border-b-2 border-stone-800">
              <NavLink href={item.link} isActive={item.activeCodition}>
                {item.icon} <span>{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </ul>
      </div>
    </aside>
  )
}
