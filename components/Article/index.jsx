import NextImage from 'next/future/image'

import { useEffect, useState, Children } from 'react'

import { MDXRemote } from 'next-mdx-remote'

import 'highlight.js/styles/stackoverflow-dark.css'

import YouTube from '../YouTube'
import InteractiveParallelism from '../ArticleComponents/InteractiveParallelism'
import SQLJoinsEditor from '../ArticleComponents/SQLJoinsEditor'
import TabsWithSections from '../TabsWithSections'
import ShareButtons from '../ShareButtons'

import Cards from '../Cards'
import Card from '../Card'

import { Note, Warning, Instruction, Error } from '../ArticleComponents/Blocks'

import normalizeImageSize from '../../helpers/normalizeImageSize'

const h1 = (props) => <h1 {...props} className={props.className ?? "" + " sm:text-5xl text-4xl sm:mt-14 mt-10 sm:mb-10 mb-8 font-semibold"} />
const h2 = (props) => <h2 {...props} className={props.className ?? "" + " sm:text-4xl text-3xl sm:mt-12 mt-8 sm:mb-8 mb-6 font-semibold"} />
const h3 = (props) => <h3 {...props} className={props.className ?? "" + " sm:text-3xl text-lg  sm:mt-10 mt-6 sm:mb-6 mb-4 font-semibold"} />
const p = (props) => <p {...props} className={props.className ?? "" +   " sm:text-lg text-base sm:my-8 my-4 font-light"} />
const ul = (props) => <ul {...props} className={props.className ?? "" + " sm:text-lg text-base sm:m-8  m-4 list-disc font-light"} />
const ol = (props) => <ol {...props} className={props.className ?? "" + " sm:text-lg text-base sm:m-8  m-4 list-decimal font-light"} />
const li = (props) => <li {...props} className={props.className ?? "" + " sm:mb-4 mb-2"} />
const a = (props) => <a {...props} className={props.className ?? "" + " text-indigo-600 hover:text-indigo-500 font-light"} />

function urlForLocalFile({path, dirUrl}) {
  if (path.startsWith('/images')) {
    return new URL(path.replace('/images/', 'images/'), dirUrl+"/").href
  }
  if (path.startsWith('/files')) {
    return new URL(path.replace('/files/', 'files/'), dirUrl+"/").href
  }
  if (path.startsWith('/assets')) {
    return new URL(path.replace('/assets/', 'assets/'), dirUrl+"/").href
  }
  return url
}



export default function Page({ mdxSource, dirUrl, getPostBySlug, ImageComponent = NextImage, url, title, urlShort, ...props }) {

  function PostCard({slug}) {
    const [post, setPost] = useState(null)
    useEffect(() => {
      getPostBySlug(slug)
        .then(setPost)
    }, [slug])
    if (!post) return null
    // return <Cards posts={[post]} />
    const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })
    return <div className='mb-10 max-w-sm mx-auto'><Card  ImageComponent={ImageComponent} post={post} imageSize={imageSize}></Card></div>
  }

  function Tabs({children}) {
    const tabs = Children.map(children, (child) => ({...child.props}))
    tabs[0].current = true
    return (
      <TabsWithSections tabs={tabs} />
    )
  }

  function Tab({children, name}) {
    return <div>Tab: name</div>
  }

  const img = ({ src, props }) => (src.startsWith('/images') || src.startsWith("/assets")) ? <img src={urlForLocalFile({path: props.src, dirUrl})} {...props} /> : <img src={src} {...props} />
  const Image = ({src, ...props}) => {
    return (src.startsWith('/images') || src.startsWith("/assets")) ? <NextImage {...props} src={urlForLocalFile({path: src, dirUrl})} /> : <img {...props} src={src} />
  }
  const File = ({ path, children }) => <a className="text-indigo-600 hover:text-indigo-500" href={urlForLocalFile({path, dirUrl})}>{children}</a>

  const AutoPlayVideo = ({ path, children }) => {
    // auto play video without sound or controls
    return (
      <div className="relative w-full h-0" style={{paddingBottom: "56.25%"}}>
        <video {...children} className="absolute top-0 left-0 w-full h-full" autoPlay muted loop playsInline>
          <source src={urlForLocalFile({path, dirUrl})} type="video/mp4" />
        </video>
      </div>
    )
  }

  const components = { 
    h1, h2, h3, p, ul, ol, li, a, img, 
    Image, Note, Warning, Instruction, Error,
    Tabs, Tab,
    PostCard, 
    YouTube, File, AutoPlayVideo,
    InteractiveParallelism, SQLJoinsEditor 
  }

  return (
    <div className="break-words">
      <ShareButtons 
      className='float-right mb-2'
      url={url}
      title={title}
      urlShort={urlShort}
      />
      <div className='clear-both'>
      {mdxSource &&
        <MDXRemote {...mdxSource} components={components} />
      }
      </div>
    </div>
  )
}

