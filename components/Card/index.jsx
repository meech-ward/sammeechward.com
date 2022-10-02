import Link from 'next/link'
import Image from 'next/future/image'

import { PlayIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

import limit from '../../helpers/limit'

import normalizeImageSize from '../../helpers/normalizeImageSize'

export default function Example({ post, ImageComponent = Image }) {
  const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })

  const Icon = (() => {
    switch (post.type) {
      case 'videos':
        return PlayIcon
      case 'articles':
        return DocumentTextIcon
      default:
        return null
    }
  })()

  return (
    <div className='flex flex-col relative top-1 hover:top-0 transition-all duration-200'>


      <Link
        href={post.href}
      >
        <a
          className="flex-1 flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200"
        >
          <div className="flex-shrink-0">
            {post?.image?.url ?
              <ImageComponent
                className="h-48 w-full object-cover"
                src={post.image.url}
                alt={post.title}
                {...imageSize}
                layout="fill"
                quality={100}
              />
              :
              <p>No Image</p>
            }
          </div>
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600">
                {/* <a href={post.category.href} className="hover:underline">
              {post.category.name}
            </a> */}
              </p>
              {/* <a href={post.href} className="mt-2 block"> */}
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {limit(post.description, 100)}
              </p>
              {/* </a> */}
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0 text-gray-400">
                {Icon && <Icon className="block h-6 w-6" aria-hidden="true" />}
                {/* <a href={post.author?.href}>
              <span className="sr-only">{post.author?.name}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={post.author?.imageUrl}
                alt=""
              />
            </a> */}
              </div>
              {/* <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={post.author?.href} className="hover:underline">
                {post.author?.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.datetime}>{post.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} read</span>
            </div>
          </div> */}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}
