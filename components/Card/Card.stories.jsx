import Card from './index'
import Image from 'next/image'

export default {
  title: 'Card',
  component: Card, 
}

const posts = [
  {
    id: 'ef40847f-36d0-4f11-8b33-db2209737b8a',
    yt_id: 'VVU2YVRMdUlfajQtMHdpRFN6bWFQY3RRLmZWN1prWUlfZWZ3',
    videoId: 'fV7ZkYI_efw',
    title: 'Beginning iOS Development for Not Beginners',
    date: '2020-06-06T23:15:56Z',
    slug: 'beginning-ios-development-for-not-beginners',
    image: {
      name: 'beginning-ios-development-for-not-beginners.jpg',
      alt: 'Beginning iOS Development for Not Beginners',
      width: 1280,
      height: 720,
      url: 'http://127.0.0.1:8008/content/videos/videos/beginning-ios-development-for-not-beginners/images/beginning-ios-development-for-not-beginners.jpg'
    },
    status: 'published',
    description: "In this video, I'm going to show you how to get started making iOS apps by building a basic Rock, Paper, Scissors game.",
    tags: [],
    skipSize: 571,
    dirPath: 'content/videos/videos/beginning-ios-development-for-not-beginners',
    indexPath: 'content/videos/videos/beginning-ios-development-for-not-beginners/index.mdx',
    imagesPath: 'content/videos/videos/beginning-ios-development-for-not-beginners/images',
    hash: 'fcf4c5f61721004c0dddfa16436ccf6c24f3fc45',
    type: 'videos',
    href: '/videos/beginning-ios-development-for-not-beginners',
    editUrl: 'http://127.0.0.1:8008/content/videos/videos/beginning-ios-development-for-not-beginners/index.mdx'
  }
]



export const Primary = () => (
  <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2 h-screen">
  <Card ImageComponent={(Image)} post={posts[0]} />
  </div>
)


export const Truncated = () => (
  <Card ImageComponent={(Image)} post={posts[2]} />
)

export const Many = () => (
  <>
  {posts.map(post => (
    <Card ImageComponent={(Image)} key={post.id} post={post} />
  ))}
  </>
)