import axios from 'axios';
import useSWR from 'swr'
import { getSessionAndUser } from '../../server/user'

import mapComment from '../../helpers/mapComment'

import Head from 'next/head';
import Comments from '../../components/Comments'


import Hero from '../../components/ArticleHero'

const commentFetcher = (url) => axios.get(url).then((res) => Promise.all(res?.data?.comments?.map(mapComment)))

export default function Profile({user}) {

  const { data, error } = useSWR('/api/comments', commentFetcher)

  const contentMaxWidth = "max-w-5xl"

  const imageSize = {width: 336, height: 336}

  console.log(data)
  const Contents = () => (
    <div className={`${contentMaxWidth} mx-auto px-4 pt-4 pb-6 sm:pt-8 sm:pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14`}>
      <h3 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl'>My Comments</h3>
      {!data ? <div>loading...</div> :
        <Comments comments={data} showResponseCount />
      }
    </div>
  )

  console.log(user.image)

  return (
    <>
      <Head>
        <title>{user.name || "saM"}</title>
      </Head>
      <>
          <Hero title={user.name} subTitle={""} description={""} image={{ url: user.image, ...imageSize }}></Hero>
          <Contents />
        </>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const { user } = await getSessionAndUser(req, res)

  if (!user) {
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