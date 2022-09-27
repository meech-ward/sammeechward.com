import axios from 'axios'
import Cards from '../../components/Cards'

export default function Articles({ articles }) {
  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Articles</h1>
      <Cards posts={articles} />
    </div>
  )
}

export async function getStaticProps() {

  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const articles = res.data.articles.entities.map(article => ({
    ...article,
    href: `/articles/${article.slug}`,
    imageUrl: article.imageUrl && new URL(article.imageUrl, process.env.MDX_ROOT_URL).href,
  }))

  return {
    props: {
      articles
    }
  }
}
