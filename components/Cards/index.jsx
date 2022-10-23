import Card from '../Card'


import normalizeImageSize from '../../helpers/normalizeImageSize'

import { twMerge } from 'tailwind-merge'

export default function Cards({ posts, ImageComponent, className }) {
  return (
    <div className={twMerge("mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3", className)}>
      {posts.map((post) => {
        const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
        console.log("imageSize", imageSize)
        console.log(post.image)
        return <Card ImageComponent={ImageComponent} post={post} key={post.id} imageSize={imageSize}></Card>
      })}
    </div>
  )
}
