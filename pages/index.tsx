import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Login from '../components/Login'
import Feed from '../components/Feed'
import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from 'next-auth/react'

const Home: NextPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession()
  //if not user is connected !session you get redirected to login page
  if (!session) return <Login providers={providers} />
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        {session.user?.name}
        {/* Widgets */}

        {/* Modal */}
      </main>
    </div>
  )
}

export default Home
export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
