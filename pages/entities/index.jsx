import { allEntities } from '../../server/database'
import Cards from '../../components/Cards'

import Image from 'next/future/image'

function makeImageComponent({ src, width, height, alt, loader }) {
  return function ImageComponent(props) {
    const imageProps = { src, width, height, alt, loader, ...props}
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

export default function Articles({ entities }) {
  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Articles</h1>
      <Cards posts={entities} ImageComponent={ImageComponent} />
    </div>
  )
}

export async function getStaticProps() {

  const entities = await allEntities()
  
  return {
    props: {
      entities
    }
  }
}
