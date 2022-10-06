import Head from 'next/head'
import { getPosts } from '../../server/dynamo/queries'
import Cards from '../../components/Cards'

import { useState } from 'react'

import Image from 'next/future/image'
import axios from 'axios'

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

// const loader = (props) => {
//   console.log({props})
//   return props.src
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }

const ImageComponent = makeImageComponent({})

export default function Articles(props) {

  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(props.lastEvaluatedKey)
  const [entities, setEntities] = useState(props.entities)

  const loadMorePosts = async () => {
    const res = await axios.get(`/api/entities?limit=30&lastEvaluatedKey=${lastEvaluatedKey}`)
    setLastEvaluatedKey(res.data.lastEvaluatedKey)
    setEntities([...entities, ...res.data.posts])
  }

  return (
    <>
      <Head>
        <title>saM: Posts</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Videos, Articles, and Tutorials</h1>
        <Cards posts={entities} ImageComponent={ImageComponent} />
        {lastEvaluatedKey &&
          <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
            <button
              onClick={loadMorePosts}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              MOAR!
            </button>
          </div>
        }
      </div>
    </>
  )
}

export async function getStaticProps() {

  const { posts, count, lastEvaluatedKey } = await getPosts()
  return {
    props: {
      entities: posts,
      lastEvaluatedKey
    }
  }
}
