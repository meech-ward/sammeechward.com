import YouTube from "../YouTube"

export default function FeaturedVideo({ videoId, title, description }) {
  return (
    <div className="relative bg-gray-50 px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-gray-300 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl px-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {description}
          </p>
        </div>
        <YouTube videoId={videoId} />
      </div>
    </div>
  )
}
