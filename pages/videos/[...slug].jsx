import Hero from '../../components/Hero'

import axios from 'axios'
import Cards from '../../components/Cards'
import Article from '../../components/Article'
import YouTube from '../../components/YouTube'

export default function Videos({ markdown, title, videoId, imageUrl, description}) {
  return (
    <>
    {/* <Hero title={title} subTitle={""} description={""} imageUrl={imageUrl}></Hero> */}
    <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      <YouTube className={"max-w-6xl mx-auto"} videoId={videoId} />
      <h1 className='max-w-6xl mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
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

async function getVideos() {
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return res.data.videos.entities
}

async function getArticle(slug) {
  const videos = await getVideos()
  const article = videos.find(article => article.slug === slug)
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
