import Head from 'next/head'
import Meta from '../components/Meta'
import { getPost as getPostMarkdown } from '../server/markdownFiles'
import { getPost as getPostFromDynamo, getPosts as getPostsFromDynamo, getPostPlaylists } from '../server/dynamo/queries'

import mapComment from '../helpers/mapComment'
import serializeMDX from '../helpers/serializeMDX'

import Hero from '../components/ArticleHero'
import Article from '../components/Article'

import Image from 'next/future/image'

import Card from '../components/Card'

import YouTube from '../components/YouTube'

import EntityCommentForm from '../components/EntityCommentForm'
import Comments from '../components/Comments'

import normalizeImageSize from '../helpers/normalizeImageSize'

import axios from 'axios'

import { useEffect, useRef, useState } from 'react'
import SideBar from '../components/Sidebar'

import { useRouter } from 'next/router'

import {
  PlayIcon,
} from '@heroicons/react/24/outline'
import Cards from '../components/Cards'


function getPostBySlug(slug) {
  return axios.get("/api/entities/" + slug).then(res => res.data.post)
}

export default function Post({ dirUrl, commentCount, likeCount, slug, title, image, editUrl, mdxSource, description, type, videoId, nextPostSlug, previousPostSlug, playlists }) {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(commentCount)
  const [totalLikes, setTotalLikes] = useState(likeCount)
  const [youtubeComments, setYoutubeComments] = useState([])
  const [totalYoutubeComments, setTotalYoutubeComments] = useState(0)
  const [postedComment, setPostedComment] = useState(false)
  const [nextPost, setNextPost] = useState(null)
  const [previousPost, setPreviousPost] = useState(null)
  const [playlist, setPlaylist] = useState(null)

  const commentsRef = useRef()

  const router = useRouter()

  const imageSize = normalizeImageSize({ ...image, maxHeight: 336 * 2 })

  useEffect(() => {
    if (!postedComment) {
      return
    }
    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [comments])


  useEffect(() => {
    ; (async () => {
      const res = await axios.get(`/api/comments?post=${slug}`)
      const comments = await Promise.all(res.data.comments.map(mapComment))
      setComments(comments)
    })()
  }, [slug])

  useEffect(() => {
    if (!nextPostSlug) {
      setNextPost(null)
      return
    }
    ; (async () => {
      const post = await getPostBySlug(nextPostSlug)
      setNextPost(post)
    })()
  }, [nextPostSlug])

  useEffect(() => {
    if (!previousPostSlug) {
      setPreviousPost(null)
      return
    }
    ; (async () => {
      const post = await getPostBySlug(previousPostSlug)
      setPreviousPost(post)
    })()

  }, [previousPostSlug])

  useEffect(() => {
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
  }, [videoId])

  useEffect(() => {
    const playlistSlug = router.query?.playlist
    if (!playlistSlug || playlistSlug === playlist?.slug) {
      return
    }
    ; (async () => {
      const res = await axios.get(`/api/playlists/${playlistSlug}`)
      setPlaylist(res.data.playlist)
    })()
  }, [router.query])



  const handlePostedComment = async (comment) => {
    setComments([...comments, await mapComment(comment)])
    setTotalComments(totalComments + 1)
    setPostedComment(true)
  }

  const contentMaxWidth = "max-w-5xl"

  const Contents = () => (
    <div className={`${contentMaxWidth} mx-auto px-4 pt-4 pb-6 sm:pt-8 sm:pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14`}>
      {playlists && !router.query?.playlist && (
        <>
          <hr />
          <p className='mt-4'>This video is part of the following playlists:</p>
          <Cards className={"mt-3 mb-8"} posts={playlists.map(p => ({ ...p, href: `/${slug}?playlist=${p.slug}`, image: null }))} />
          <hr />
        </>
      )}
      <Article mdxSource={mdxSource} dirUrl={dirUrl} getPostBySlug={getPostBySlug} />
    </div>
  )
  const PageContent = () => (
    <>
      {isVideo ?
        <>
          <div className="sm:px-6 lg:px-8 sm:pt-6 lg:pt-12">
            <YouTube className={"max-w-7xl mx-auto"} videoId={videoId} />
            <h1 className='mx-2 sm:mx-6 xl:max-w-7xl xl:mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl'>{title}</h1>
          </div>
          <Contents></Contents>
        </>
        :
        <>
          <Hero title={title} subTitle={""} description={""} image={{ ...image, ...imageSize }}></Hero>
          <Contents />
        </>
      }


      {editUrl &&
        <p className='text-center mb-10'>Find an issue with this page?&nbsp;
          <a target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }

      {/* Next Cards */}

      <div className={`${contentMaxWidth} px-4 sm:px-6 lg:px-8 mx-auto flex flex-col sm:flex-row justify-between`}>
        {previousPost && <div className='flex-1 max-w-sm'><Card post={{ ...previousPost, description: null }} imageSize={normalizeImageSize({ ...previousPost.image, maxHeight: 192 * 2 })}></Card></div>}
        <div className='flex-1 max-w-sm'>{nextPost && <Card post={{ ...nextPost, description: null }} imageSize={normalizeImageSize({ ...nextPost.image, maxHeight: 192 * 2 })}></Card>}</div>
      </div>

      {/* Comments */}

      <div className={`${contentMaxWidth} mx-auto px-4 pt-4 pb-6 sm:pt-8 sm:pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14`}>
        <hr />
        {/* <h2 className="my-6">{totalComments} Comments</h2> */}
        {/* <h2 className="my-6">{totalLikes} Likes</h2> */}
        <div className="my-6">
          <EntityCommentForm onPostedComment={handlePostedComment} entitySlug={slug} />
        </div>

        <Comments ref={commentsRef} comments={comments} />
        {isVideo && !!youtubeComments.length &&
          <>
            <hr />
            {/* <h2 className="mt-10 mb-3">{totalYoutubeComments >= 100 ? "100+" : totalYoutubeComments} Youtube Comments: </h2> */}
            <h2 className="mt-10 mb-3">Youtube Comments: </h2>
            <Comments comments={youtubeComments} />
          </>
        }
      </div>
    </>
  )
  const isVideo = type === "video"
  return (
    <>
      <Head>
        <title>{title}</title>
        <Meta
          title={title}
          description={description}
          image={`https://www.sammeechward.com/_next/image?url=${encodeURIComponent(image.url)}&w=1200&q=75`}
          imageWidth={image.width}
          imageHeight={image.height}
          url={`https://sammeechward.com/${slug}`}
        />
      </Head>
      {router.query?.playlist ? (
        <SideBar navigation={!playlist ? [] : playlist.children.map(child => ({ name: child.title, href: `/${child.slug}?playlist=${playlist.slug}`, icon: PlayIcon, current: child.slug === slug }))}>
          {PageContent()}
        </SideBar>
      ) : (
        PageContent()
      )}
    </>
  )
}

export async function getStaticPaths() {
  const { posts } = await getPostsFromDynamo({ limit: 100 })
  return {
    paths: posts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {

  const slug = context.params.slug
  try {
    const playlists = await getPostPlaylists({ slug })
    const dbPost = await getPostFromDynamo(slug)
    const post = await getPostMarkdown(dbPost)
    const mdxSource = await serializeMDX(post.markdown)

    // console.log({dbPost, post})

    console.log({ playlists })

    console.log(context.params)

    return {
      props: {
        ...post,
        mdxSource,
        playlists
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}
