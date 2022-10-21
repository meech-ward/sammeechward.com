import Card from '../Card'


import normalizeImageSize from '../../helpers/normalizeImageSize'

export default function Cards({ posts, ImageComponent }) {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => {
        const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
        return <Card ImageComponent={ImageComponent} post={post} key={post.id} imageSize={imageSize}></Card>
      })}
    </div>
  )
}
