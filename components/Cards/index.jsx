import Card from '../Card'

export default function Cards({ posts, ImageComponent }) {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <Card ImageComponent={ImageComponent} post={post} key={post.id}></Card>
      ))}
    </div>
  )
}
