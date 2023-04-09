import { useEffect, useState } from "react"
import { Adsense } from "@ctrl/react-adsense"

export function InArticle() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <></>
  }
  return process.env.NODE_ENV == "production" ? (
    <h1>Ad</h1>
  ) : (
    <Adsense adTest={true} className="adsbygoogle" style={{ display: "block", textAlign: "center" }} layout="in-article" format="fluid" client="ca-pub-7566221825946498" slot="4599631467" />
  )
}

export function InFeed() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <></>
  }
  return process.env.NODE_ENV == "production" ? (
    <h1>Ad</h1>
  ) : (
    <Adsense adTest={true} className="adsbygoogle" style={{ display: "block" }} format="fluid" layout-key="-5j+c6-1t-7m+w8" client="ca-pub-7566221825946498" slot="6633895726" />
  )
}
