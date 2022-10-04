import Image from 'next/future/image'
import CommentMarkdown from '../CommentMarkdown'

import TimeAgo from 'javascript-time-ago'

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function Comments({ImageComponent = Image, comments}) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {comments.map(comment => (
          <li key={comment.id} className="py-4">
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
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {comment.name}
                  </h3>
                  <p className="text-sm text-gray-500">{timeAgo.format(new Date(comment.created))}</p>
                </div>
                <p className="text-sm text-gray-500">
                  <CommentMarkdown mdxSource={comment.mdxSource} />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
