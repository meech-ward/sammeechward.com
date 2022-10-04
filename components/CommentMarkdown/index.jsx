import { MDXRemote } from 'next-mdx-remote'

import 'highlight.js/styles/stackoverflow-dark.css'

// import NextImage from 'next/future/image'

const h1 = (props) => <h1 {...props} className={props.className ?? "" + " text-2xl mt-4 mb-4 font-semibold"} />
const h2 = (props) => <h2 {...props} className={props.className ?? "" + " text-xl mt-2 mb-2 font-semibold"} />
const h3 = (props) => <h3 {...props} className={props.className ?? "" + " text-lg mt-1 mb-1 font-semibold"} />
const p = (props) => <p {...props} className={props.className ?? "" + " text-m my-1 font-light"} />
const ul = (props) => <ul {...props} className={props.className ?? "" + " text-lg m-1 list-disc font-light"} />
const ol = (props) => <ol {...props} className={props.className ?? "" + " text-lg m-1 list-decimal font-light"} />
const li = (props) => <li {...props} className={props.className ?? "" + " mb-1"} />
const a = (props) => <a {...props} className={props.className ?? "" + " text-indigo-600 hover:text-indigo-500 font-light"} />


export default function CommentMarkdown({ mdxSource }) {


  const components = { h1, h2, h3, p, ul, ol, li, a }

  return (
    <div className="max-w-3xl mx-auto break-words">
      {mdxSource &&
        <MDXRemote {...mdxSource} components={components} />
      }
    </div>
  )
}

