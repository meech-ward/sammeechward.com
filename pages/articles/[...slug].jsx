import { getArticle } from '../../server/database'
import serializeMDX from '../../helpers/serializeMDX'

import Hero from '../../components/ArticleHero'
import Article from '../../components/Article'

import normalizeImageSize from '../../helpers/normalizeImageSize'


export default function Articles({ markdown, title, image, editUrl, mdxSource, description }) {
  const imageSize = normalizeImageSize({...image, maxHeight: 336 * 2})
  return (
    <>
      <Hero title={title} subTitle={""} description={""} image={{...image, ...imageSize}}></Hero>
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <Article mdxSource={mdxSource} />
      </div>
      {editUrl &&
        <p className='text-center my-10'>Find an issue with this page?&nbsp;
          <a  target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
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
  const mdxSource = await serializeMDX(article.markdown)

  return {
    props: {
      ...article,
      mdxSource
    }
  }
}
