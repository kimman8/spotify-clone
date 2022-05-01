import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Head from 'next/head'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
