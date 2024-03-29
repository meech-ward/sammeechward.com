import Image from 'next/image'
import CommentMarkdown from '../CommentMarkdown'

import TimeAgo from 'javascript-time-ago'

import { forwardRef } from 'react'
import Link from 'next/link'

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

function Comment({ comment, onReply, ImageComponent, showResponseCount = false }) {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <ImageComponent
          className="h-6 w-6 rounded-full"
          width={50}
          height={50}
          src={comment.image}
          alt={comment.name}
        />
      </div>
      <div className="flex-1 space-y-1 overflow-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">
            {comment.name}
          </h3>
          <p className="text-sm text-gray-500">{timeAgo.format(new Date(comment.created))}</p>
        </div>
        <div className="text-sm text-gray-500">
          <CommentMarkdown mdxSource={comment.mdxSource} />
        </div>
        {comment.post &&
          <Link href={`/${comment.post}`}>
            <a className="text-sm text-gray-500 underline">{comment.post}</a>
          </Link>
        }
        {onReply &&
          <button onClick={() => onReply(comment)} className="text-sm text-gray-500 underline">
            Reply
          </button>
        }
        {showResponseCount && comment.responseCount > 0 && (
          <p className="text-sm text-gray-500">
            {comment.responseCount} {comment.responseCount === 1 ? 'response' : 'responses'}
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(function Comments({ ImageComponent = Image, comments, onReply, showResponseCount }, ref) {
  return (
    <div ref={ref}>
      <ul role="list" className="divide-y divide-gray-200">
        {comments.map(comment => (
          <li key={comment.id} className="py-4">
            <Comment showResponseCount={showResponseCount} comment={comment} onReply={onReply} ImageComponent={ImageComponent} />
            {comment.replies && (
              <ul role="list" className="ml-12 divide-y divide-gray-200">
                {comment.replies.map(reply => (
                  <li key={reply.id} className="py-4">
                    <Comment showResponseCount={showResponseCount} comment={reply} onReply={onReply} ImageComponent={ImageComponent} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
})
