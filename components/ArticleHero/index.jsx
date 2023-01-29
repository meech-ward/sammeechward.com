import Image from 'next/image'

export default function Hero({ title, image }) {
  const imageDimensions = {}
  if (image.width && image.height) {
    imageDimensions.width = image.width
    imageDimensions.height = image.height
  }
  const pb = "pb-4 sm:pb-8  md:pb-10  lg:pb-14  xl:pb-16"
  const mt = "mt-6 sm:mt-12 md:mt-15  lg:mt-21  xl:mt-24"
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-2">
        <div className={`relative z-10 bg-white lg:w-2/4 lg:max-w-2xl ${pb}`}>
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative px-4 pt-1 sm:px-6 lg:px-8">
          </div>


          <div className={`mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 ${mt}`}>
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{title}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src={image.url}
          {...imageDimensions}
          // height={500}
          // width={500}
          alt=""
          priority
        />
      </div>
    </div>
  )
}
