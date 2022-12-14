import Card from '../Card'


import normalizeImageSize from '../../helpers/normalizeImageSize'

import { twMerge } from 'tailwind-merge'

export default function Cards({ posts, ImageComponent, className }) {
  return (
    <div className={twMerge("mx-auto mt-12 max-w-lg gap-10 lg:max-w-none grid lg:grid-cols-2", className)}>
      {posts.map((post) => {
          const imageSize = normalizeImageSize({ ...post.image, maxWidth: 1000 })
          const _post = { ...post }
          delete _post.date
          _post.extraData = `${_post.children.length} articles/videos`
          return <Card ImageComponent={ImageComponent} post={_post} key={_post.id} imageSize={imageSize}></Card>
        })}
    </div>
  )
}
