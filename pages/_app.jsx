import "../styles/globals.css"
import SiteNavigation from "../components/SiteNavigation"

import { SessionProvider } from "next-auth/react"

import { GoogleAnalytics } from "nextjs-google-analytics"

import { useState } from "react"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import Script from "next/script"
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

function MyApp({ Component, pageProps }) {

  const [adsEnabled, setAdsEnabled] = useState(true)
  return (
    <SessionProvider session={pageProps.session}>
      <GoogleAnalytics trackPageViews />
      <Script
        id="ca-pub-7566221825946498"
        async
        onError={(e) => {
          // console.error("Script failed to load", e)
          setAdsEnabled(false)
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7566221825946498"
        crossorigin="anonymous"
      ></Script>
      <SiteNavigation />
      <Component {...pageProps} adsEnabled={adsEnabled} />
    </SessionProvider>
  )
}

export default MyApp
