import Card from '../Card'


import normalizeImageSize from '../../helpers/normalizeImageSize'

export default function Cards({ posts, ImageComponent }) {
  return (
    <div className="mx-auto mt-12 max-w-lg gap-10 lg:max-w-none">
      {posts.map((post) => {
          const imageSize = normalizeImageSize({ ...post.image, maxWidth: 1000 })
          const _post = { ...post }
          delete _post.date
          _post.extraData = `${_post.children.length} articles/videos`
          return <Card className='my-10' ImageComponent={ImageComponent} post={_post} key={_post.id} imageSize={imageSize}></Card>
        })}
    </div>
  )
}
