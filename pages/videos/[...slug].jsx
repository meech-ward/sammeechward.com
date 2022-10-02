import { getVideo } from '../../server/database'

import Image from 'next/future/image'

import Article from '../../components/Article'
import YouTube from '../../components/YouTube'

import serializeMDX from '../../helpers/serializeMDX'
import { useEffect, useState } from 'react'

import axios from 'axios'

export default function Videos({ markdown, title, videoId, editUrl, mdxSource, imageUrl, description }) {

  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getComments() {
      const res = await axios.get(`/api/videos/${videoId}/comments`)
      const comments = res.data
      setComments(comments)
    }
    getComments()
  }, [])

  return (
    <>
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <YouTube className={"max-w-6xl mx-auto"} videoId={videoId} />
        <h1 className='max-w-6xl mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
        <Article mdxSource={mdxSource} />

        {
          comments.map(comment => {
            return (
              <div key={comment.id} className="max-w-6xl mx-auto">
                <p>{comment.displayName}</p>
                <Image width={48} height={48} src={comment.profileImageUrl}></Image>
                <p>{comment.text}</p>
                <p>Likes: {comment.likeCount}</p>
              </div>
            )
          })
        }

        {editUrl &&
          <p className='text-center my-10'>Find an issue with this page?&nbsp;
            <a target="_blank" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
          </p>
        }
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {

  const [slug] = context.params.slug
  const video = await getVideo(slug)
  const mdxSource = await serializeMDX(video.markdown)


  return {
    props: {
      ...video,
      mdxSource
    }
  }
}
