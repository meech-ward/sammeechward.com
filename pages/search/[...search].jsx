import Cards from '../../components/Cards'
import { algoliasearch } from 'algoliasearch';
import entityDetails from '../../helpers/entityDetails';

export default function Articles({ term, entities }) {
  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>{term}</h1>
      <Cards posts={entities} />
    </div>
  )
}

export async function getServerSideProps(context) {

  const [term] = context.params.search

  const searchClient = algoliasearch(process.env.ALGOLIA_SEARCH_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY);

  const {results} = await searchClient.search({
    requests: [
      {
        indexName: process.env.ALGOLIA_SEARCH_POSTS_INDEX_NAME,
        query: term,
        hitsPerPage: 50,
      },
    ],
  })

  console.log(results[0].hits)

  return {
    props: {
      term,
      entities: results[0].hits.map(entityDetails)
    }
  }
}
