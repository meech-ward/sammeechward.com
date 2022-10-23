import Head from 'next/head'
import Meta from '../../components/Meta'
import { getPlaylists } from '../../server/dynamo/queries'
import Cards from '../../components/Cards'
import Card from '../../components/Card'

import toilet from '../../public/toilet.jpg'

import Image from 'next/future/image'

import normalizeImageSize from '../../helpers/normalizeImageSize'

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
        />
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        {/* <div className="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3"> */}
        {entities.map((playlist) => {
          const imageSize = normalizeImageSize({ ...playlist.image, maxWidth: 1000 })
          const post = { ...playlist }
          delete post.date
          post.extraData = `${post.children.length} videos`
          return <Card ImageComponent={ImageComponent} post={post} key={playlist.id} imageSize={imageSize}></Card>
        })}
        {/* </div> */}
        {/* <Cards posts={entities} ImageComponent={ImageComponent} /> */}
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
