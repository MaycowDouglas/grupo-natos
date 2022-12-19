import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useUser from '~/hooks/useUser'
import { TemplateProps } from '~/types/components'

import { OverlayLayer } from '../ui/atoms/OverlayLayer'
import { ContactOptions } from '../ui/organisms/ContactOptions'
import { DashboardHeader } from '../ui/organisms/DashboardHeader'
import { DashboardSidebar } from '../ui/organisms/DashboardSidebar'

export const TemplateDashboard = ({ title, description, children }: TemplateProps) => {
  const { user } = useUser({ redirectTo: '/login' })
  const { asPath } = useRouter()
  const [showSidebar, setSidebarVisibility] = useState<boolean>(false)

  let username = ''
  if (user?.name) {
    username = user?.name?.split(' ')[0].toLowerCase()
    username = username[0].toUpperCase() + username.substring(1)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="relative flex">
        {showSidebar && (
          <OverlayLayer className="bg-[#FFFFFFaa]" onClick={() => setSidebarVisibility(false)} />
        )}

        <DashboardSidebar
          isOpen={showSidebar}
          onClick={() => setSidebarVisibility(false)}
          pathname={asPath}
        />

        <div className="w-full min-h-screen bg-gray-100">
          <DashboardHeader
            title={title}
            username={`Olá, ${username}!`}
            handleSidebar={() => setSidebarVisibility(true)}
          />

          <main>{children}</main>
        </div>

        <ContactOptions />
      </div>
    </>
  )
}
