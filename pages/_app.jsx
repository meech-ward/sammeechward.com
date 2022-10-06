import '../styles/globals.css'
import SiteNavigation from '../components/SiteNavigation'

import { SessionProvider } from "next-auth/react"

import { GoogleAnalytics } from "nextjs-google-analytics";


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)



function MyApp({ Component, pageProps }) {

  return (
    <SessionProvider session={pageProps.session}>
      <GoogleAnalytics trackPageViews />
      <SiteNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
