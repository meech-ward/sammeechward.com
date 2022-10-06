import Head from 'next/head'
import Hero from '../components/Hero'
import FeaturedCards from '../components/FeaturedCards'
import FeaturedVideo from '../components/FeaturedVideo'

import { getFeaturedPosts, getMostRecentVideo } from '../server/dynamo/queries'

import toilet from '../public/toilet.jpg'

const description = `
If you're in a position
Where the goal is addition
And one of the operand's ToPrimitive is string
Then concatenation 
Is Javascript's mission
A language that understands how to vindictively sting`

export default function Home({ featuredEntities, featuredVideo }) {
  return (
    <>
      <Head>
        <title>saM</title>
      </Head>

      <Hero
        title={"Sam Meech-Ward"}
        description={description}
        imageUrl={toilet}
        icons={{
          github: "https://github.com/meech-ward",
          instagram: "https://www.instagram.com/meech_ward",
          twitter: "https://twitter.com/Meech_Ward",
          youtube: "https://www.youtube.com/channel/UC6aTLuI_j4-0wiDSzmaPctQ",
          linkedin: "https://www.linkedin.com/in/sam-meech-ward-a485ab1a/",
        }}
        buttons={[
          { title: "Videos and Articles", href: "/posts" },
          // { title: "Contact", href: "/contact" },
        ]}
      />

      <FeaturedVideo title={"Latest Upload"} description={featuredVideo.title + " " + featuredVideo.description} videoId={featuredVideo.videoId} />

      <FeaturedCards title={"Most Popular"} description={"Take a look at what other people like"} posts={featuredEntities} />

    </>
  )
}

export async function getStaticProps() {

  const featuredEntities = await getFeaturedPosts()
  const featuredVideo = await getMostRecentVideo()

  return {
    props: {
      featuredVideo: featuredVideo,
      featuredEntities
    }
  }
}