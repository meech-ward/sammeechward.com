import Card from '../Card'

import normalizeImageSize from '../../helpers/normalizeImageSize'

export default function FeaturedCards({ posts, title, description }) {
  return (
    <div className="relative bg-gray-50 px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-gray-300 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl px-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })

            return <Card post={post} key={post.id} imageSize={imageSize}></Card>
          }
          )}
        </div>
      </div>
    </div>
  )
}
