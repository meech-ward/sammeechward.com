import Head from 'next/head'
import Meta from '../../components/Meta'
import { getPost as getPostMarkdown } from '../../server/markdownFiles'
import { getPost as getPostFromDynamo, getPosts as getPostsFromDynamo } from '../../server/dynamo/queries'

import mapComment from '../../helpers/mapComment'
import serializeMDX from '../../helpers/serializeMDX'

import Hero from '../../components/ArticleHero'
import Article from '../../components/Article'

import Image from 'next/image'

import Cards from '../../components/Cards'

import EntityCommentForm from '../../components/EntityCommentForm'
import Comments from '../../components/Comments'

import normalizeImageSize from '../../helpers/normalizeImageSize'

import axios from 'axios'

import { useEffect, useRef, useState } from 'react'
import SideBar from '../../components/Sidebar'

import {
  QueueListIcon,
} from '@heroicons/react/24/outline'

import mapPlaylistChildData from '../../helpers/mapPlaylistChildData'


function getPostBySlug(slug) {
  return axios.get("/api/entities/" + slug).then(res => res.data.post)
}

function makeImageComponent({ src, width, height, alt, loader }) {
  return function ImageComponent(props) {
    const imageProps = { src, width, height, alt, loader, ...props }
    return (
      <Image
        {...imageProps}
      />
    )
  }
}

const ImageComponent = makeImageComponent({})

export default function Post({ dirUrl, commentCount, likeCount, slug, title, image, editUrl, mdxSource, description, type, children, nextPostSlug, previousPostSlug, params }) {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(commentCount)
  const [totalLikes, setTotalLikes] = useState(likeCount)
  const [youtubeComments, setYoutubeComments] = useState([])
  const [totalYoutubeComments, setTotalYoutubeComments] = useState(0)
  const [postedComment, setPostedComment] = useState(false)
  const [nextPost, setNextPost] = useState(null)
  const [previousPost, setPreviousPost] = useState(null)

  const commentsRef = useRef()

  const imageSize = normalizeImageSize({ ...image, maxHeight: 336 * 2 })

  useEffect(() => {
    if (!postedComment) {
      return
    }
    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [postedComment])


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

  const handlePostedComment = async (comment) => {
    setComments([...comments, await mapComment(comment)])
    setTotalComments(totalComments + 1)
    setPostedComment(true)
  }


  console.log({slug})
  const playlistSlug = slug
  children = children.map(child => mapPlaylistChildData({child, slug, playlistSlug}))

  const contentMaxWidth = "max-w-5xl"

  const Contents = () => (
    <div className={`${contentMaxWidth} mx-auto px-4 pt-4 pb-6 sm:pt-8 sm:pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14`}>
      <Article
        mdxSource={mdxSource}
        dirUrl={dirUrl}
        getPostBySlug={getPostBySlug}
        title={title}
        url={`https://www.sammeechward.com/playlists/${slug}`}
        urlShort={`https://smw.wtf/playlists/${slug}`}
      />
    </div>
  )

  const ChildCards = (children, className) => {
    if (!children) {
      return null
    }
    if (children?.[0]?.type == 'section') {
      return children.map(section => {
        return (
          <div key={section.name} className="mb-32">
            <h2 id={section.slug} className="text-4xl font-bold mb-4 mt-2">{section.name}</h2>
            {ChildCards(section.children, 'mb-32')}
          </div>
        )
      })
    }
    return <Cards className={className} posts={children?.map(c => ({ ...c, href: `${c.href}?playlist=${slug}` }))} ImageComponent={ImageComponent} />
  }

  const PageContent = () => (
    <>

      <Hero title={title} subTitle={""} description={""} image={{ ...image, ...imageSize }}></Hero>
      <Contents />
      <div className="pt-8 pb-10 lg:pt-6 lg:pb-14 mx-auto max-w-7xl px-2">
        {ChildCards(children)}
      </div>




      {editUrl &&
        <p className='text-center mb-10'>Find an issue with this page?&nbsp;
          <a target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }

      {/* Comments */}

      <div className={`${contentMaxWidth} mx-auto px-4 pt-4 pb-6 sm:pt-8 sm:pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14`}>
        <hr />
        {/* <h2 className="my-6">{totalComments} Comments</h2> */}
        {/* <h2 className="my-6">{totalLikes} Likes</h2> */}
        <div className="my-6">
          <EntityCommentForm onPostedComment={handlePostedComment} entitySlug={slug} />
        </div>

        <Comments ref={commentsRef} comments={comments} />

      </div>
    </>
  )

  let navigation = [
    {
      name: title,
      href: `/playlists/${slug}`,
      icon: QueueListIcon,
      current: true
    },
    ...children
  ]

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

      <SideBar navigation={navigation}>
        {PageContent()}
      </SideBar>

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
  console.log({slug})
  try {
    const dbPost = await getPostFromDynamo(slug)
    const post = await getPostMarkdown(dbPost)
    const mdxSource = await serializeMDX(post.markdown)

    let children = post.children ?? []
    if (typeof post.children?.[0] === 'string') {
      children = await Promise.all(children.map(slug => getPostFromDynamo(slug)))
    } else {
      children = await Promise.all(children.map(async section => {
        return {
          ...section,
          children: await Promise.all(section.children.map(slug => getPostFromDynamo(slug)))
        }
      }))
    }

    return {
      props: {
        ...post,
        mdxSource,
        children,
        params: context.params,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}
