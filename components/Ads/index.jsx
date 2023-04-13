import { useEffect, useState, useRef } from "react"

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

export function InFeed() {
  const [loaded, setLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Adjust this value to control when the element is considered visible.
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [loaded]);

  useEffect(() => {
    if (isVisible) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [isVisible]);

  if (!loaded) {
    return <></>
  }
  return (
    <>
      <ins
        ref={elementRef}
        data-adtest={process.env.NODE_ENV !== "production"}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-5j+c6-1t-7m+w8"
        data-ad-client="ca-pub-7566221825946498"
        data-ad-slot="6633895726"
      ></ins>
    </>
  )
}
