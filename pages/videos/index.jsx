import axios from 'axios'
import Cards from '../../components/Cards'

export default function Videos({ videos }) {
  return (
    <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Videos</h1>
      <Cards posts={videos} />
    </div>
  )
}

export async function getStaticProps() {

  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const videos = res.data.videos.entities.map(article => ({
    ...article,
    href: `/videos/${article.slug}`,
    imageUrl: article.imageUrl && new URL(article.imageUrl, process.env.MDX_ROOT_URL).href,
  }))

  return {
    props: {
      videos
    }
  }
}
