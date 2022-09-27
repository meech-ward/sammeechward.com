import Hero from '../components/Hero'
import FeaturedCards from '../components/FeaturedCards'
import FeaturedVideo from '../components/FeaturedVideo'

import axios from 'axios'

const description = `
If you're in a position
Where the goal is addition
And one of the operand's ToPrimitive is string
Then concatenation 
Is Javascript's mission
A language that understands how to vindictively sting`

export default function Home({featuredEntities, featuredVideo}) {
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

  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const articles = res.data.articles.entities.map(article => ({
    ...article,
    href: `/articles/${article.slug}`,
    imageUrl: article.imageUrl && new URL(article.imageUrl, process.env.MDX_ROOT_URL).href,
  }))
  const videos = res.data.videos.entities.map(video => ({
    ...video,
    href: `/videos/${video.slug}`,
    imageUrl: video.imageUrl && new URL(video.imageUrl, process.env.MDX_ROOT_URL).href,
  }))

  const randomVideo = videos[0]

  const featuredEntities = [videos[1], articles[1], videos[2]]

  return {
    props: {
      featuredVideo: randomVideo,
      featuredEntities
    }
  }
}