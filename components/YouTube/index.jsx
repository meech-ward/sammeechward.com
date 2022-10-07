import { useEffect, useRef } from "react"

export default function YouTube({ videoId, className = "max-w-3xl mx-auto" }) {
  return (
    <div className={className + " relative pb-5"}>
      <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}