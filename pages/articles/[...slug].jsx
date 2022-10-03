import { getArticle } from '../../server/database'
import serializeMDX from '../../helpers/serializeMDX'

import Hero from '../../components/ArticleHero'
import Article from '../../components/Article'

import CommentForm from '../../components/CommentForm'

import normalizeImageSize from '../../helpers/normalizeImageSize'

import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
  

export default function Articles({ markdown, id, title, image, editUrl, mdxSource, description }) {

  const { data: session } = useSession()

  const imageSize = normalizeImageSize({...image, maxHeight: 336 * 2})

  const handleCommentSubmission = async (text) => {
    if (!session) {
      signIn()
      return
    }
    const res = await axios.post('/api/comments', {text, articleId: id})
    console.log(res.data)
  }

  const handleCommentTextChange = (text) => {
    window.localStorage.setItem(`post-${id}-comment`, text)
  }

  const [initialCommentText, setInitialCommentText] = useState(null)
  useEffect(() => {
    const text = window.localStorage.getItem(`post-${id}-comment`)
    setInitialCommentText(text || "")
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
      {initialCommentText != null &&
       <CommentForm initialText={initialCommentText} onSubmit={handleCommentSubmission} onTextChange={handleCommentTextChange} />
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
  const article = await getArticle(slug)
  const mdxSource = await serializeMDX(article.markdown)

  return {
    props: {
      ...article,
      mdxSource
    }
  }
}
