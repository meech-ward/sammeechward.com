import { getPost as getPostMarkdown } from '../server/markdownFiles'
import { getPost as getPostFromDynamo } from '../server/dynamo/queries'
import serializeMDX from '../helpers/serializeMDX'

import Hero from '../components/ArticleHero'
import Article from '../components/Article'

import Image from 'next/future/image'

import YouTube from '../components/YouTube'

import EntityCommentForm from '../components/EntityCommentForm'
import Comments from '../components/Comments'

import normalizeImageSize from '../helpers/normalizeImageSize'

import axios from 'axios'

import { useEffect, useState } from 'react'


export default function Entities({ markdown, totalComments, totalLikes, slug, title, image, editUrl, mdxSource, description, type, videoId }) {

  const [comments, setComments] = useState([])
  const [youtubeComments, setYoutubeComments] = useState([])
  const [postedComment, setPostedComment] = useState(false)

  const imageSize = normalizeImageSize({ ...image, maxHeight: 336 * 2 })

  useEffect(() => {
    if (!postedComment) {
      return
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }, [comments])


  useEffect(() => {
    ; (async () => {
      const res = await axios.get(`/api/comments?post=${slug}`)
      const comments = await Promise.all(res.data.comments.map(mapComment))
      setComments(comments)
    })()

    ; (async () => {
      if (!videoId) {
        return
      }
      const res = await axios.get(`/api/videos/${videoId}/comments`)
      console.log(res.data.comments)
      const comments = await Promise.all(res.data.comments.map(mapComment))
      setYoutubeComments(comments)
    })()

  }, [])

  async function mapComment(comment) {
    const mdxSource = await serializeMDX(comment.text)
    return {
      ...comment,
      mdxSource
    }
  }

  const handlePostedComment = async (comment) => {
    setComments([...comments, await mapComment(comment)])
    setPostedComment(true)
  }

  return (
    <div className={type === "video" ? "px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14" : ""}>
      {type === "video" ?
        <>
          <YouTube className={"max-w-6xl mx-auto"} videoId={videoId} />
          <h1 className='max-w-6xl mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
          <Article mdxSource={mdxSource} />
        </>
        :
        <>
          <Hero title={title} subTitle={""} description={""} image={{ ...image, ...imageSize }}></Hero>
          <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
            <Article mdxSource={mdxSource} />
          </div>
        </>
      }
      {editUrl &&
        <p className='text-center my-10'>Find an issue with this page?&nbsp;
          <a target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }

      {/* Comments */}
      <div className="max-w-3xl mx-auto mb-10">
        <hr />
        <h2 className="my-6">{totalComments} Comments</h2>
        <h2 className="my-6">{totalLikes} Likes</h2>
        <div className="my-6">
          <EntityCommentForm onPostedComment={handlePostedComment} entitySlug={slug} />
        </div>


        <Comments comments={comments} />
        <hr />
        <h2 className="mt-10 mb-3">{totalComments} Youtube Comments: </h2>
        <Comments comments={youtubeComments} />
      </div>
    </div>
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
  try {
    const dbPost = await getPostFromDynamo(slug)
    const post = await getPostMarkdown(dbPost)
    const mdxSource = await serializeMDX(post.markdown)

    return {
      props: {
        ...post,
        mdxSource
      }
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
