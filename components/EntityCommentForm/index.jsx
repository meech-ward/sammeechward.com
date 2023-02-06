import CommentForm from '../CommentForm'
import { useEffect, useState } from 'react'
import { forwardRef } from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

import axios from 'axios'


export default forwardRef(function EntityCommentForm({onPostedComment, entitySlug, defaultText = null, respondingToComment}, ref) {

  const [initialCommentText, setInitialCommentText] = useState(defaultText)
  const submitText = respondingToComment ? "Reply to " + respondingToComment.name : undefined

  const { data: session } = useSession()

  useEffect(() => {
    if (defaultText) {
      setInitialCommentText(defaultText)
      return 
    }
    const text = window.localStorage.getItem(`post-${entitySlug}-comment`)
    setInitialCommentText(text || "")
  }, [defaultText, entitySlug])

  const handleCommentSubmission = async (text) => {
    if (!session) {
      signIn()
      return false
    }
    const data = { text, entitySlug: entitySlug}
    if (respondingToComment) {
      data.respondingToComment = {id: respondingToComment.id}
    }
    const res = await axios.post('/api/comments', data)
    const comment = res.data.comment
    onPostedComment(comment)

    window.localStorage.removeItem(`post-${entitySlug}-comment`)
    return true
  }

  const handleCommentTextChange = (text) => {
    window.localStorage.setItem(`post-${entitySlug}-comment`, text)
  }

  return (
    <div ref={ref}>
      {initialCommentText != null &&
        <CommentForm initialText={initialCommentText} onSubmit={handleCommentSubmission} onTextChange={handleCommentTextChange} {...{submitText}} />
      }
    </div>
  )
})
