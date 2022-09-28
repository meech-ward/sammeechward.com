import Hero from '../components/Hero'
import FeaturedCards from '../components/FeaturedCards'
import FeaturedVideo from '../components/FeaturedVideo'

import { getVideos, getArticles } from '../server/database'

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

      <Hero
        title={"Sam Meech-Ward"}
        description={description}
        imageUrl={"/toilet.jpg"}
        buttons={[
          { title: "About", href: "/about" },
          { title: "Contact", href: "/contact" },
        ]}
      />

      <FeaturedCards title={"Most Popular Shit"} description={"Get started by taking a look at what other people like"} posts={featuredEntities} />

      <FeaturedVideo title={"Latest Upload"} description={featuredVideo.title + " " + featuredVideo.description} videoId={featuredVideo.videoId} />
    </>
  )
}

export async function getStaticProps() {

  const articles = await getArticles()
  const videos = await getVideos()

  const randomVideo = videos[0]

  const featuredEntities = [videos[1], articles[1], videos[2]]

  return {
    props: {
      featuredVideo: randomVideo,
      featuredEntities
    }
  }
}