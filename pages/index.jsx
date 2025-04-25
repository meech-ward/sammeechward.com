import Head from "next/head"
import Hero from "../components/Hero"
import FeaturedCards from "../components/FeaturedCards"
import FeaturedVideo from "../components/FeaturedVideo"
import { Cloud } from "lucide-react"

import Link from "next/link"

import { getFeaturedPosts, getMostRecentVideo } from "../server/dynamo/queries"

import Meta from "../components/Meta"

import toilet from "../public/toilet.jpg"
import TechStack from "../components/TechStack"
import MailingListForm from "./mailing-list"

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
        <Meta
          title="saM"
          description={description}
          // image={`https://www.sammeechward.com/_next/image?url=${encodeURIComponent(`https://www.sammeechward.com${toilet.src}`)}&w=700&q=75`}
          image={`https://www.sammeechward.com${toilet.src}`}
          imageWidth={toilet.width}
          imageHeight={toilet.height}
          url="https://sammeechward.com"
          urlShort={`https://smw.wtf`}
        />
      </Head>

      {/* <Hero
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
      /> */}
      {/* <div className="bg-gray-900 px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
        <div className="mx-auto max-w-7xl px-2">
          <div className="text-center">
            <MailingListForm />
          </div>
        </div>
      </div> */}

      <div className="py-8">
        <a href="https://cloudcourse.dev" className="max-w-7xl mx-auto rounded-3xl overflow-hidden block" target="_blank" rel="noopener noreferrer">
          <OgCard variant="og" />
        </a>
      </div>

      {/* <TechStack /> */}

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
      featuredEntities,
    },
  }
}

import React from "react"

export function OgCard({ variant }) {
  const isOg = variant === "og"

  return (
    <div className="bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600  relative overflow-hidden">
      {/* Content */}
      <div className={`relative h-full my-20 px-2 flex ${isOg ? "flex-col items-center justify-center" : "items-center justify-center"}`}>
        {/* Logo/Icon */}
        <div className={`${isOg ? "mb-12" : ""} flex items-center justify-center`}>
          <div className={`${isOg ? "w-40 h-40" : "w-20 h-20"} rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/20`}>
            <Cloud className={`${isOg ? "w-24 h-24" : "w-10 h-10"} text-white`} />
          </div>
        </div>

        {/* Text Content - Only for OG variant */}
        {isOg && (
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6">Cloud Course</h1>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto">Master cloud computing with hands-on, practical learning</p>
          </div>
        )}
      </div>
    </div>
  )
}
