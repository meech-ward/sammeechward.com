import axios from 'axios'
import Cards from '../../components/Cards'

export default function Articles({ search, entities }) {
  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>{search}</h1>
      <Cards posts={entities} />
    </div>
  )
}

export async function getServerSideProps(context) {

  const [search] = context.params.search

  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  let all = []
  for (const section in res.data) {
    all.push(...res.data[section].entities.map(e => ({...e, type: section})))
  }
  all = all.flat()
  all = all.filter(entity => (
    entity.title.toLowerCase().includes(search.toLowerCase()) ||
    entity.description.toLowerCase().includes(search.toLowerCase()) ||
    entity.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  ))
  .map(entity => ({
    ...entity,
    href: `/${entity.type}/${entity.slug}`,
    imageUrl: entity.imageUrl && new URL(entity.imageUrl, process.env.MDX_ROOT_URL).href,
  }))
  console.log(all)


  return {
    props: {
      search,
      entities: all
    }
  }
}
