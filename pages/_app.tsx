import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
