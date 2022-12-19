import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'
import { FiChevronDown, FiMenu } from 'react-icons/fi'
import { IoExitOutline } from 'react-icons/io5'

import useUser from '~/hooks/useUser'
import fetchJson from '~/lib/fetchJson'

import { NavItem } from '../atoms/NavItem'
import { OverlayLayer } from '../atoms/OverlayLayer'

type Props = {
  title: string
  username: string
  handleSidebar: MouseEventHandler<HTMLButtonElement>
}

export const DashboardHeader = ({ username, title, handleSidebar }: Props) => {
  const router = useRouter()
  const { mutateUser } = useUser()
  const [userOptionsIsVisible, setUserOptionsVisibility] = useState<boolean>(false)

  return (
    <>
      {userOptionsIsVisible && <OverlayLayer onClick={() => setUserOptionsVisibility(false)} />}
      <header className="flex lg:items-center justify-between py-5 px-10 bg-white">
        <div>
          <button
            onClick={handleSidebar}
            className="lg:hidden grid place-content-center p-2 rounded-full bg-gray-200"
          >
            <FiMenu />
          </button>
          <h1 className="mt-4 lg:mt-0 text-4xl font-medium">{title}</h1>
        </div>
        <div className="inline relative mt-2 lg:mt-0">
          <button
            type="button"
            className="relative inline-flex justify-center items-center gap-2 outline-none font-medium text-gray-700"
            onClick={() => setUserOptionsVisibility(!userOptionsIsVisible)}
          >
            {username}
            <FiChevronDown />
          </button>
          <ul
            className={`rounded-xl shadow-[0_0_26px_rgba(0,0,0,0.11)] right-0 top-7 w-48 bg-white z-20 ${
              userOptionsIsVisible ? 'absolute' : 'hidden'
            }`}
          >
            <NavItem>
              <Link href="/dashboard/profile" legacyBehavior>
                <a>Editar perfil</a>
              </Link>
            </NavItem>
            <li className="border-t-2 border-gray-200"></li>
            <NavItem>
              <a
                className="flex items-center justify-center gap-2 py-1 border-2 border-red-500 rounded-full hover:bg-red-500 text-red-500 hover:text-white font-medium cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault()
                  mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
                  router.push('/login')
                }}
              >
                Sair
                <IoExitOutline className="text-lg" />
              </a>
            </NavItem>
          </ul>
        </div>
      </header>
    </>
  )
}
