import serializeMDX from '../../helpers/serializeMDX'

import { useEffect, useState } from 'react'
import CommentMarkdown from './index'

export default {
  title: 'CommentMarkdown',
  component: CommentMarkdown, 
}

const md = `
# Hello World

What's up
`



export const Primary = () => {
  const [mdxSource, setMdxSource] = useState(null)
  useEffect(() => {
    serializeMDX(md).then(setMdxSource)
  })
  return mdxSource && <CommentMarkdown mdxSource={mdxSource} />
}