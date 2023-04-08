import { useEffect, useState } from "react"

export function InArticle() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <></>
  }
  return process.env.NODE_ENV !== "production" ? (
    <h1>Ad</h1>
  ) : (
    <>
      <ins
        className="adsbygoogle"
        style={{display:"block", textAlign:"center"}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7566221825946498"
        data-ad-slot="4599631467"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
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
  return process.env.NODE_ENV !== "production" ? (
    <h1>Ad</h1>
  ) : (
    <>
      <ins className="adsbygoogle" style={{display:"block"}} data-ad-format="fluid" data-ad-layout-key="-5j+c6-1t-7m+w8" data-ad-client="ca-pub-7566221825946498" data-ad-slot="6633895726"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  )
}
