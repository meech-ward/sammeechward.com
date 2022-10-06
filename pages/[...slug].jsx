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

import { useEffect, useRef, useState } from 'react'


export default function Entities({ markdown, rootURL, rootImagesUrl, commentCount, likeCount, slug, title, image, editUrl, mdxSource, description, type, videoId }) {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(commentCount)
  const [totalLikes, setTotalLikes] = useState(likeCount)
  const [youtubeComments, setYoutubeComments] = useState([])
  const [totalYoutubeComments, setTotalYoutubeComments] = useState(0)
  const [postedComment, setPostedComment] = useState(false)

  const commentsRef = useRef()

  const imageSize = normalizeImageSize({ ...image, maxHeight: 336 * 2 })

  useEffect(() => {
    if (!postedComment) {
      return
    }
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: 'smooth'
    // })
    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
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
        const { commentsAndReplies, totalCommentsAndReplies } = res.data
        const comments = await Promise.all(commentsAndReplies.map(mapComment))
        setYoutubeComments(comments)
        setTotalYoutubeComments(totalCommentsAndReplies)
      })()

  }, [])

  async function mapComment(comment) {
    let mdxSource = ""
    try {
      mdxSource = await (serializeMDX(comment.text).catch(() => serializeMDX("```\n" + comment.text + "\n```")))
      if (comment.replies) {
        comment.replies = await Promise.all(comment.replies.map(mapComment))
      }
    } catch (e) {
      // console.log("serializeMDX error:", e) 
    }
    return {
      ...comment,
      mdxSource
    }
  }

  const handlePostedComment = async (comment) => {
    setComments([...comments, await mapComment(comment)])
    setTotalComments(totalComments + 1)
    setPostedComment(true)
  }

  const Contents = ({ children }) => (
    <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      {children}
      <Article mdxSource={mdxSource} rootURL={rootURL} rootImagesUrl={rootImagesUrl} />
    </div>
  )
  const isVideo = type === "video"
  return (
    <>
      {isVideo ?
        <>
          <div className="sm:px-6 lg:px-8 sm:pt-6 lg:pt-12">
            <YouTube className={"max-w-6xl mx-auto"} videoId={videoId} />
          </div>
          <h1 className='mx-2 sm:mx-6 xl:max-w-6xl xl:mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
          <Contents>
          </Contents>
        </>
        :
        <>
          <Hero title={title} subTitle={""} description={""} image={{ ...image, ...imageSize }}></Hero>
          <Contents />
        </>
      }
      {editUrl &&
        <p className='text-center my-10'>Find an issue with this page?&nbsp;
          <a target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }

      {/* Comments */}

      <div className="mx-4 mb-5 sm:mx-8 sm:mb-5 max-w-3xl md:mx-auto sm:mb-10">
        <hr />
        <h2 className="my-6">{totalComments} Comments</h2>
        <h2 className="my-6">{totalLikes} Likes</h2>
        <div className="my-6">
          <EntityCommentForm onPostedComment={handlePostedComment} entitySlug={slug} />
        </div>

        <Comments ref={commentsRef} comments={comments} />
        {isVideo && !!youtubeComments.length &&
          <>
            <hr />
            <h2 className="mt-10 mb-3">{totalYoutubeComments >= 100 ? "100+" : totalYoutubeComments} Youtube Comments: </h2>
            <Comments comments={youtubeComments} />
          </>
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
