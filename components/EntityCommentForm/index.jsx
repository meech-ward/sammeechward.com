import CommentForm from '../CommentForm'
import { useEffect, useState } from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

import axios from 'axios'


export default function EntityCommentForm({onPostedComment, entitySlug}) {

  const [initialCommentText, setInitialCommentText] = useState(null)

  const { data: session } = useSession()

  useEffect(() => {
    const text = window.localStorage.getItem(`post-${entitySlug}-comment`)
    setInitialCommentText(text || "")
  }, [])

  const handleCommentSubmission = async (text) => {
    if (!session) {
      signIn()
      return
    }
    const res = await axios.post('/api/comments', { text, entitySlug: entitySlug })
    const comment = res.data.comment
    onPostedComment(comment)

    window.localStorage.removeItem(`post-${entitySlug}-comment`)
  }

  const handleCommentTextChange = (text) => {
    window.localStorage.setItem(`post-${entitySlug}-comment`, text)
  }

  return (
    <>
      {initialCommentText != null &&
        <CommentForm initialText={initialCommentText} onSubmit={handleCommentSubmission} onTextChange={handleCommentTextChange} />
      }
    </>
  )
}
