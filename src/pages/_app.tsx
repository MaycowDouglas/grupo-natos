import '~/styles/globals.css'
import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'

import fetchJson from '~/lib/fetchJson'

const aeonik = localFont({
  src: [
    {
      path: '../../public/fonts/aeonik/400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aeonik/500.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      nProgress.start()
    }

    const handleStop = () => {
      nProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <div className={`${aeonik.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  )
}
