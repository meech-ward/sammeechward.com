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
export const Primary = () => (
  <Article source={md} />
)