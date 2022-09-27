import { getVideo } from '../../server/database'

import Article from '../../components/Article'
import YouTube from '../../components/YouTube'

export default function Videos({ markdown, title, videoId, editUrl, mdxSource, imageUrl, description }) {
  return (
    <>
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <YouTube className={"max-w-6xl mx-auto"} videoId={videoId} />
        <h1 className='max-w-6xl mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
        <Article mdxSource={mdxSource} />
        {editUrl &&
          <p className='text-center my-10'>Find an issue with this page?&nbsp;
            <a target="_blank" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
          </p>
        }
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

export async function getStaticProps(context) {

  const [slug] = context.params.slug
  const video = await getVideo(slug)
  const mdxSource = await serializeMDX(article.markdown)


  return {
    props: {
      ...video,
      mdxSource
    }
  }
}
