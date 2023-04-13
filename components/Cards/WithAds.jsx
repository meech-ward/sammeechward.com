import Card from "../Card"
import { InFeed } from "../Ads"

import normalizeImageSize from "../../helpers/normalizeImageSize"

import { twMerge } from "tailwind-merge"

export default function Cards({ posts, ImageComponent, className, showAds }) {
  // insert a new object into the posts array every 5 posts
  // this will insert an ad after the 5th, 10th, 15th, etc. post
  if (showAds) {
    posts = posts.reduce((acc, post, index) => {
      if (index % showAds.every === showAds.at) {
        acc.push({ type: "ad", id: `ad-${index}` })
      }
      acc.push(post)
      return acc
    }, [])
  }

  return (
    <div className={twMerge("mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3", className)}>
      {posts.map((post) => {
        if (post.type === "ad") {
          
          return (
            <div className='flex flex-col relative top-1 hover:top-0 transition-all duration-200'><InFeed key={post.id} /></div>
          )
        }
        const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
        return <Card ImageComponent={ImageComponent} post={post} key={post.id} imageSize={imageSize}></Card>
      })}
    </div>
  )
}
