import Card from "../Card"
import { InFeed } from "../Ads"

import normalizeImageSize from "../../helpers/normalizeImageSize"

import { twMerge } from "tailwind-merge"

export default function Cards({ posts, ImageComponent, className }) {
  // insert a new object into the posts array every 5 posts
  // this will insert an ad after the 5th, 10th, 15th, etc. post
  const postsWithAds = posts.reduce((acc, post, index) => {
    if (index % 5 === 4) {
      acc.push({ type: "ad", id: `ad-${index}` })
    }
    acc.push(post)
    return acc
  }, [])

  return (
    <div className={twMerge("mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3", className)}>
      {postsWithAds.map((post) => {
        if (post.type === "ad") {
          return <InFeed key={post.id} />
        }
        const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
        return <Card ImageComponent={ImageComponent} post={post} key={post.id} imageSize={imageSize}></Card>
      })}
    </div>
  )
}
