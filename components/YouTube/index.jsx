import { useEffect, useRef } from "react"

export default function YouTube({ videoId, className }) {
  const videoRef = useRef()
  useEffect(() => {
    const width = videoRef.current.offsetWidth
    console.log({width})
  })

  return (
    <div ref={videoRef} className={(className || " max-w-3xl mx-auto") + " relative pb-10"}>
      <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}