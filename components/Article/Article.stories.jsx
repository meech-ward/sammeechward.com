import serializeMDX from '../../helpers/serializeMDX'

import { useEffect, useState } from 'react'
import Article from './index'

export default {
  title: 'Article',
  component: Article, 
}

const md = `---
title: "Connect to MySQL from Node"
date: "2021-01-01"
---

# Hello World

What's up


`



export const Primary = () => {
  const [mdxSource, setMdxSource] = useState(null)
  useEffect(() => {
    serializeMDX(md).then(setMdxSource)
  })
  return mdxSource && <Article mdxSource={mdxSource} />
}