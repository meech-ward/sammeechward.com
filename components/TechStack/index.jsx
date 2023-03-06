import Image from 'next/image'
import Link from 'next/link'
import csharp from '../../public/tech/c-sharp.png'
import javascript from '../../public/tech/javascript.svg'
// import ts from '../../public/tech/ts.svg'
import database from '../../public/tech/database.png'
import swift from '../../public/tech/swift.svg'
import next from '../../public/tech/next-js.svg'
import aws from '../../public/tech/aws.jpg'
import lambda from '../../public/tech/lambda.png'
import react from '../../public/tech/react.svg'
// import iot from '../../public/tech/iot.png'

import normalizeImageSize from '../../helpers/normalizeImageSize'

import { twMerge } from "tailwind-merge"

const techStack = [
  { src: javascript, alt: "JavaScript", href: "/category/javascript" },
  { src: swift, alt: "Swift/iOS", href: "/category/swift" },
  { src: csharp, alt: "C#", href: "/category/csharp-dotnet" },
  { src: database, alt: "Databases/SQL", href: "/category/Database" },
  { src: react, alt: "React.js", href: "/category/React-js" },
  { src: next, alt: "Next.js", href: "/category/next-js" },
  { src: aws, alt: "AWS/Cloud", href: "/category/aws-cloud-computing" },
  { src: lambda, alt: "Serverless", href: "/category/serverless" },
  // { src: iot, alt: "IoT", href: "" },
]


export default function TechStack({ posts, title, description }) {
  return (
    <div className="relative bg-gray-50 px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      <div className="relative mx-auto max-w-7xl px-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Topics
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Some of the main topics I like to write and make videos about.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-16 lg:max-w-none lg:grid-cols-4">
          {techStack.map((image, index) => {
            // const imageSize = normalizeImageSize({ ...post.image, maxHeight: 192 * 2 })

            return <Card image={image} key={index} ></Card>
          }
          )}
        </div>
      </div>
    </div>
  )
}



function Card({ image, ImageComponent = Image, className }) {


  return (
    <div className={twMerge('flex flex-col relative top-1 hover:top-0 transition-all duration-200', className)}>


      <Link
        href={image.href}
        className="flex-1 flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200"
      >
        <div className="flex-shrink-0 group relative">

          <ImageComponent
            className="w-full object-cover"
            src={image.src}
            alt={image.alt}
            // {...imageSize}
            quality={100}
          />
          <div class="opacity-0 group-hover:opacity-100 absolute inset-0 z-10 flex justify-center items-center">
            <div class="bg-gray-900 bg-opacity-80 text-white text-center p-2 rounded-lg w-full h-full flex justify-center items-center text-xl">{ image.alt }</div>
          </div>

        </div>

      </Link>
    </div>
  )
}
