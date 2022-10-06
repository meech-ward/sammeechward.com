import '../styles/globals.css'
import Header from '../components/Header'

import { useRouter } from 'next/router'

import { useSession, signIn, signOut } from "next-auth/react"
import { SessionProvider } from "next-auth/react"

import { GoogleAnalytics } from "nextjs-google-analytics";


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

function MyHeader() {
  const router = useRouter()

  
  const { data: session } = useSession()

  const links = [
    // {title: 'Articles', href: '/articles', selected: router.pathname.startsWith('/articles')},
    // {title: 'Videos', href: '/videos', selected: router.pathname.startsWith('/videos')},
    {title: 'My Shit', href: '/entities', selected: router.pathname.startsWith('/entities')},
    // {title: 'Learning Paths', href: '/learning-paths', selected: router.pathname.startsWith('/learning-paths')},
    // {title: 'Courses', href: '/courses', selected: router.pathname.startsWith('/courses')},
  ]

  const onSearch = term => {
    router.push(`/search/${term}`)
  }

  return (
    <Header links={links} onSearch={onSearch} user={session?.user} signIn={signIn} signOut={signOut}></Header>
  )
}

function MyApp({ Component, pageProps }) {

  return (
    <SessionProvider session={pageProps.session}>
      <GoogleAnalytics trackPageViews />
      <MyHeader />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
