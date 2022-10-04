// 1
import Comments from './index'
import Image from 'next/image'

import { useEffect, useState } from 'react'

import serializeMDX from '../../helpers/serializeMDX'

// 2
// The default export metadata controls how Storybook lists your stories and provides information used by addons. 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Comments',
  component: Comments, //  provides information used by addons.?
}

const originComments = [
  {
    "name": "Sam Meech-Ward",
    "email": "sam@meech-ward.me",
    "image": "https://avatars.githubusercontent.com/u/2434008?v=4",
    "text": "This is kind of cool I guess, just a one liner",
    "created": "2022-10-03T23:55:17.103Z",
    "id": "01GEG4CYQFVAMKM5TCW815PZQR"
  },
  {
    "name": "Sam Meech-Ward",
    "email": "sam@meech-ward.me",
    "image": "https://avatars.githubusercontent.com/u/2434008?v=4",
    "text": `
    # This is a heading
    
    ## sub heading
    
    \`\`\`js
    const a = 1
    \`\`\`
    `,
    "created": "2022-10-03T23:55:17.103Z",
    "id": "01GEG4CYQFVAMKM5TCW815PZQR"
  },
  {
    "name": "Sam Meech-Ward",
    "email": "sam@meech-ward.me",
    "image": "https://avatars.githubusercontent.com/u/2434008?v=4",
    "text": "This is kind of cool I guess\n\nThis is a multi line comment",
    "created": "2022-10-03T23:55:17.103Z",
    "id": "01GEG4CYQFVAMKM5TCW815PZQR"
  },
  {
    "id": "2",
    "name": "Some Name",
    "image": "https://avatars.githubusercontent.com/u/2434008?v=4",
    "text": `# Hello World

    What's up
    `,
    "created": "2022-10-03T23:55:17.103Z",
  }
]
export const Primary = () => {

  const [comments, setComments] = useState([])
  useEffect(() => {
    Promise.all(originComments.map(async comment => ({
      ...comment, 
      mdxSource: await serializeMDX(comment.text)
    }))).then(setComments)
  })

  return (
    <Comments
      ImageComponent={Image}
      comments={comments}
    />
  )
}
