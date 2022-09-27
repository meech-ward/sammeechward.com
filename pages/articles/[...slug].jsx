import { getArticle } from '../../server/database'

import Hero from '../../components/Hero'
import Article from '../../components/Article'

export default function Articles({ markdown, title, imageUrl, editUrl, description }) {
  return (
    <>
      <Hero title={title} subTitle={""} description={""} imageUrl={imageUrl}></Hero>
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <Article source={markdown} />
      </div>
      {editUrl &&
        <p className='text-center my-10'>Find an issue with this page?
          <a target="_blank" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
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
