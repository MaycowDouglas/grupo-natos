import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { FaTimes } from 'react-icons/fa'

import {
  BarcodeIcon,
  FileIcon,
  FilePlusIcon,
  HomeIcon,
  VenturesIcon,
} from '~/components/ui/atoms/Icons'
import { NavItem } from '~/components/ui/atoms/NavItem'
import { NavLink } from '~/components/ui/atoms/NavLink'
import BrandNatosN from '~/public/images/brands/natos-n.png'
import BrandNatos from '~/public/images/brands/natos.png'

type Props = {
  isOpen: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  pathname: string
}

export const DashboardSidebar = ({ isOpen, onClick, pathname }: Props) => {
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
          <NavItem className="border-b-2 border-stone-800">
            <NavLink href="/dashboard/posts" isActive={pathname.includes('/dashboard/posts')}>
              <HomeIcon /> <span>Notícias</span>
            </NavLink>
          </NavItem>
          <NavItem className="border-b-2 border-stone-800">
            <NavLink href="/dashboard/boletos" isActive={pathname.includes('/dashboard/boletos')}>
              <BarcodeIcon /> <span>Boletos</span>
            </NavLink>
          </NavItem>
          <NavItem className="border-b-2 border-stone-800">
            <NavLink href="/dashboard/ventures" isActive={pathname.includes('/dashboard/ventures')}>
              <VenturesIcon /> <span>Empreendimentos</span>
            </NavLink>
          </NavItem>
          <NavItem className="border-b-2 border-stone-800">
            <NavLink
              href="/dashboard/statements"
              isActive={pathname.includes('/dashboard/statements')}
            >
              <FileIcon /> <span>Extrato</span>
            </NavLink>
          </NavItem>
          <NavItem className="border-b-2 border-stone-800">
            <NavLink
              href="/dashboard/dependencies"
              isActive={pathname.includes('/dashboard/dependencies')}
            >
              <FilePlusIcon /> <span>Pendências</span>
            </NavLink>
          </NavItem>
        </ul>
      </div>
    </aside>
  )
}
