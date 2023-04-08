import "../styles/globals.css"
import SiteNavigation from "../components/SiteNavigation"

import { SessionProvider } from "next-auth/react"

import { GoogleAnalytics } from "nextjs-google-analytics"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import Script from "next/script"
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <GoogleAnalytics trackPageViews />
      <Script
        id="ca-pub-7566221825946498"
        async
        onError={(e) => {
          console.error("Script failed to load", e)
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7566221825946498"
        crossorigin="anonymous"
      ></Script>
      <SiteNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
