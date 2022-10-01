import { allEntities } from '../../server/database'
import Cards from '../../components/Cards'

export default function Articles({ entities }) {
  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Articles</h1>
      <Cards posts={entities} />
    </div>
  )
}

export async function getStaticProps() {

  const entities = await allEntities()
  console.log(entities)
  
  return {
    props: {
      entities
    }
  }
}
