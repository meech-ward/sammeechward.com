import { useState } from 'react'
import { useEffect } from 'react'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/stackoverflow-dark.css'
import langHttp from 'highlight.js/lib/languages/http'
import langNginx from 'highlight.js/lib/languages/nginx'
import langVim from 'highlight.js/lib/languages/vim'

import YouTube from '../YouTube'

const languages = {
  http: langHttp,
  nginx: langNginx,
  vim: langVim
}

const h1 = (props) => <h1 {...props} className={props.className ?? "" + " text-5xl mt-14 mb-10 font-semibold"} />
const h2 = (props) => <h2 {...props} className={props.className ?? "" + " text-4xl mt-12 mb-8 font-semibold"} />
const h3 = (props) => <h3 {...props} className={props.className ?? "" + " text-3xl mt-10 mb-6 font-semibold"} />
const p = (props) => <p {...props} className={props.className ?? "" + " text-lg my-8 font-light"} />
const ul = (props) => <ul {...props} className={props.className ?? "" + " text-lg m-8 list-disc font-light"} />
const ol = (props) => <ol {...props} className={props.className ?? "" + " text-lg m-8 list-decimal font-light"} />
const li = (props) => <li {...props} className={props.className ?? "" + " mb-4"} />
const a = (props) => <a {...props} className={props.className ?? "" + " text-indigo-600 hover:text-indigo-500 font-light"} />

function Instruction({ children }) {
  return (
    <p className='text-lg mt-4 mb-4 p-2 bg-lime-400	 p-4 rounded-md flex'>
      <span>➡️</span>{children}
    </p>
  )
}

const Note = Instruction


export default function Page({ source, rootURL }) {
  
  const [mdxSource, setMDXSource] = useState(null)
  
  const img = ({ src, alt }) => src.startsWith('/') ? <img src={rootURL + src} alt={alt} /> : <img src={src} alt={alt} />
  const File = ({name, children}) => <a className="text-indigo-600 hover:text-indigo-500" href={`${rootURL}/files/${name}`}>{children}</a>
    
  const components = { h1, h2, h3, p, ul, ol, li, a, img, Instruction, Note, YouTube, File }

  useEffect(() => {
    (async () => {
      const mdxSource = await serialize(source, {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [[rehypeHighlight, {
            languages }
        ]],
          format: 'mdx'
        },
      })
      setMDXSource(mdxSource)
    })()
  }, [source])


  return (
    <div className="max-w-3xl mx-auto">
      {mdxSource &&
        <MDXRemote {...mdxSource} components={components} />
      }
    </div>
  )
}