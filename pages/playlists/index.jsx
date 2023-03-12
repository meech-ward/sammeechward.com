import Head from 'next/head'
import Meta from '../../components/Meta'
import { getPlaylists } from '../../server/dynamo/queries'
import CardsLarge from '../../components/CardsLarge'
import Card from '../../components/Card'

import toilet from '../../public/toilet.jpg'

import Image from 'next/image'

function makeImageComponent({ src, width, height, alt, loader }) {
  return function ImageComponent(props) {
    const imageProps = { src, width, height, alt, loader, ...props }
    return (
      <Image
        {...imageProps}
      />
    )
  }
}

const ImageComponent = makeImageComponent({})


export default function Articles({ entities }) {

  return (
    <>
      <Head>
        <title>saM: Playlists</title>
        <Meta
          title="saM"
          description={"Videos, Articles, and Tutorials"}
          image={`https://www.sammeechward.com${toilet.src}`}
          imageWidth={toilet.width}
          imageHeight={toilet.height}
          url="https://sammeechward.com/playlists"
          urlShort={`smw.wtf/playlists`}
        />
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Playlists</h1>
        <CardsLarge posts={entities} ImageComponent={ImageComponent} />
      </div>
    </>
  )
}

export async function getStaticProps() {

  let { posts, count, lastEvaluatedKey } = await getPlaylists()
  posts = posts.map(p => {
    const post = {
      ...p
    }
    if (typeof post.children?.[0] !== 'string') {
      post.children = post.children.flatMap(c => c.children)
    }
    return post
  })
  return {
    props: {
      entities: posts,
      lastEvaluatedKey
    }
  }
}
