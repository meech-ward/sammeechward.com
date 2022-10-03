import { getArticle } from '../../server/database'
import serializeMDX from '../../helpers/serializeMDX'

import Hero from '../../components/ArticleHero'
import Article from '../../components/Article'

import Image from 'next/future/image'

import CommentForm from '../../components/CommentForm'

import normalizeImageSize from '../../helpers/normalizeImageSize'

import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
  

export default function Articles({ markdown, id, title, image, editUrl, mdxSource, description }) {

  const [initialCommentText, setInitialCommentText] = useState(null)
  const [comments, setComments] = useState([])
  const [postedComment, setPostedComment] = useState(false)
  
  const { data: session } = useSession()

  const imageSize = normalizeImageSize({...image, maxHeight: 336 * 2})

  const handleCommentSubmission = async (text) => {
    if (!session) {
      signIn()
      return
    }
    const res = await axios.post('/api/comments', {text, articleId: id})
    const comment = await mapComment(res.data.comment)
    setPostedComment(true)
    setComments([...comments, comment])

    setInitialCommentText("")
    window.localStorage.removeItem(`post-${id}-comment`)
  }

  const handleCommentTextChange = (text) => {
    window.localStorage.setItem(`post-${id}-comment`, text)
  }


  useEffect(() => {
    if (!postedComment) {
      return 
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }, [comments])

  async function mapComment(comment) {
    const mdxSource = await serializeMDX(comment.text)
    return {
      ...comment,
      mdxSource
    }
  }

  
  useEffect(() => {
    const text = window.localStorage.getItem(`post-${id}-comment`)
    setInitialCommentText(text || "")

    ;(async () => {
      const res = await axios.get(`/api/comments?articleId=${id}`)
      const comments = await Promise.all(res.data.comments.map(mapComment))
      setComments(comments)
    })()
      
  }, [])

  return (
    <>
      <Hero title={title} subTitle={""} description={""} image={{...image, ...imageSize}}></Hero>
      <div className="px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <Article mdxSource={mdxSource} />
      </div>
      {editUrl &&
        <p className='text-center my-10'>Find an issue with this page?&nbsp;
          <a  target="_blank" rel="noreferrer" className='text-indigo-600 hover:text-indigo-500' href={editUrl}>Fix it on GitHub</a>
        </p>
      }
      <div className="max-w-3xl mx-auto mb-10">
        <h2>Comments: </h2>
        <div className="my-10">
      {initialCommentText != null &&
       <CommentForm  initialText={initialCommentText} onSubmit={handleCommentSubmission} onTextChange={handleCommentTextChange} />
      }
      </div>
        {comments.map(comment => (
          <div key={comment.id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
            <div className="px-4 py-5 sm:px-6">
              <Image src={comment.image} width={40} height={40} className="rounded-full" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {comment.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {comment.createdAt}
              </p>
            </div>
            <div className="border-t border-gray-200">
                <div className="bg-gray-50 px-4 py-5 ">
                    <Article mdxSource={comment.mdxSource} />
                  </div>
            </div>
          </div>
        ))}

      
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
  const article = await getArticle(slug)
  const mdxSource = await serializeMDX(article.markdown)

  return {
    props: {
      ...article,
      mdxSource
    }
  }
}
