import Head from 'next/head'
import Meta from '../../components/Meta'
import { getPlaylists } from '../../server/dynamo/queries'
import Cards from '../../components/Cards'

import toilet from '../../public/toilet.jpg'

import Image from 'next/future/image'

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

export default function Articles({entities}) {

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
        />
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <Cards posts={entities} ImageComponent={ImageComponent} />
      </div>
    </>
  )
}

export async function getStaticProps() {

  const { posts, count, lastEvaluatedKey } = await getPlaylists()
  return {
    props: {
      entities: posts,
      lastEvaluatedKey
    }
  }
}
