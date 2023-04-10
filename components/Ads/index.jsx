import { useEffect, useState } from "react"

export function InArticle() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <></>
  }
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7566221825946498"
        data-ad-slot="4599631467"
        data-adtest={process.env.NODE_ENV !== "production"}
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  )
}

export function InDisplay() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <></>
  }
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-layout="in-article"
        data-ad-format="auto"
        data-ad-client="ca-pub-7566221825946498"
        data-ad-slot="2975875836"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV !== "production"}
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  )
}

// export function InFeed() {
//   const [loaded, setLoaded] = useState(false)

//   useEffect(() => {
//     setLoaded(true)
//   }, [])

//   if (!loaded) {
//     return <></>
//   }
//   return process.env.NODE_ENV == "production" ? (
//     <h1>Ad</h1>
//   ) : (
//     <>
//       <ins
//         data-adtest={true}
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-format="fluid"
//         data-ad-layout-key="-5j+c6-1t-7m+w8"
//         data-ad-client="ca-pub-7566221825946498"
//         data-ad-slot="6633895726"
//       ></ins>
//       <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
//     </>
//   )
// }

export const InFeed = InDisplay
