import Hero from '../../components/Hero'

import axios from 'axios'
import Cards from '../../components/Cards'
import Article from '../../components/Article'


export default function Articles({ markdown, title, imageUrl, description}) {
  return (
    <>
    <Hero title={title} subTitle={""} description={""} imageUrl={imageUrl}></Hero>
    <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      {/* <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Articles</h1> */}
      <Article source={markdown} />
    </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

async function getArticles() {
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return res.data.articles.entities
}

async function getArticle(slug) {
  const articles = await getArticles()
  const article = articles.find(article => article.slug === slug)
  const url = new URL(article.indexPath, process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return {
    ...article,
    markdown: res.data, 
    imageUrl: article.imageUrl && new URL(article.imageUrl, process.env.MDX_ROOT_URL).href,
  }
}

export async function getStaticProps(context) {

  const [slug] = context.params.slug
  const article = await getArticle(slug)
  

  return {
    props: {
      ...article
    }
  }
}
