import CommentForm from '../CommentForm'
import { useEffect, useState } from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

import axios from 'axios'


export default function EntityCommentForm({onPostedComment, entityId}) {

  const [initialCommentText, setInitialCommentText] = useState(null)

  const { data: session } = useSession()

  useEffect(() => {
    const text = window.localStorage.getItem(`post-${entityId}-comment`)
    setInitialCommentText(text || "")
  }, [])

  const handleCommentSubmission = async (text) => {
    if (!session) {
      signIn()
      return
    }
    const res = await axios.post('/api/comments', { text, articleId: entityId })
    const comment = res.data.comment
    onPostedComment(comment)

    window.localStorage.removeItem(`post-${entityId}-comment`)
  }

  const handleCommentTextChange = (text) => {
    window.localStorage.setItem(`post-${entityId}-comment`, text)
  }

  return (
    <>
      {initialCommentText != null &&
        <CommentForm initialText={initialCommentText} onSubmit={handleCommentSubmission} onTextChange={handleCommentTextChange} />
      }
    </>
  )
}
