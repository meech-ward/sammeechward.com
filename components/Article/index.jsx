import {cloneElement} from 'react'
import { MDXRemote } from 'next-mdx-remote'

import 'highlight.js/styles/stackoverflow-dark.css'

import YouTube from '../YouTube'

import NextImage from 'next/future/image'
const h1 = (props) => <h1 {...props} className={props.className ?? "" + " sm:text-5xl text-4xl sm:mt-14 mt-10 sm:mb-10 mb-8 font-semibold"} />
const h2 = (props) => <h2 {...props} className={props.className ?? "" + " sm:text-4xl text-3xl sm:mt-12 mt-8 sm:mb-8 mb-6 font-semibold"} />
const h3 = (props) => <h3 {...props} className={props.className ?? "" + " sm:text-3xl text-lg  sm:mt-10 mt-6 sm:mb-6 mb-4 font-semibold"} />
const p = (props) => <p {...props} className={props.className ?? "" +   " sm:text-lg text-base sm:my-8 my-4 font-light"} />
const ul = (props) => <ul {...props} className={props.className ?? "" + " sm:text-lg text-base sm:m-8  m-4 list-disc font-light"} />
const ol = (props) => <ol {...props} className={props.className ?? "" + " sm:text-lg text-base sm:m-8  m-4 list-decimal font-light"} />
const li = (props) => <li {...props} className={props.className ?? "" + " sm:mb-4 mb-2"} />
const a = (props) => <a {...props} className={props.className ?? "" + " text-indigo-600 hover:text-indigo-500 font-light"} />


function Note({children}) {
  const newChildren = cloneElement(children, {
    className: ``
  })
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 sm:my-8 my-4">
      <p className="font-bold m-0 p-0">Note</p>
      {newChildren}
    </div>
  )
}

export default function Page({ mdxSource, rootURL, rootImagesUrl }) {


  const img = ({ src, alt }) => src.startsWith('/images') ? <img src={new URL(src.replace('/images/', 'images/'), rootImagesUrl).href} alt={alt} /> : <img src={src} alt={alt} />
  const Image = (props) => {
    const { src } = props
    return src.startsWith('/images') ? <NextImage {...props} src={new URL(src.replace('/images/', 'images/'), rootImagesUrl).href} /> : <img {...props} src={src} />
  }
  const File = ({ name, children }) => <a className="text-indigo-600 hover:text-indigo-500" href={`${rootURL}/files/${name}`}>{children}</a>

  const components = { h1, h2, h3, p, ul, ol, li, a, img, Image, Note, YouTube, File }

  return (
    <div className="max-w-3xl mx-auto break-words">
      {mdxSource &&
        <MDXRemote {...mdxSource} components={components} />
      }
    </div>
  )
}

