import axios from 'axios';
import useSWR from 'swr'
import { getSessionAndUser } from '../../server/user'

import mapComment from '../../helpers/mapComment'

import Head from 'next/head';
import Comments from '../../components/Comments'

const fetcher = (url) => axios.get(url).then((res) => res.data);
const commentFetcher = (url) => axios.get(url).then((res) => Promise.all(res?.data?.comments?.map(mapComment)))

export default function Admin(props) {

  const { data, error } = useSWR('/api/admin/comments', commentFetcher)

  return (
    <>
      <Head>
        <title>saM: Posts</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Admin</h1>
        <div className="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>Comments</h2>
            {!data ? <div>loading...</div> :
              <Comments comments={data} />
            }
            {error && <div>failed to load</div>}
          </div>
          <div>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>Likes?</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const { user } = await getSessionAndUser(req, res)

  if (!user || user.role !== 'admin') {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  return {
    props: { user }
  }
}