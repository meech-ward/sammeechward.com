import YouTube from "../YouTube"

export default function FeaturedVideo({ videoId, title, description }) {
  return (
    <div className="bg-white pt-8 pb-10 lg:pt-12 lg:pb-14 sm:mt-0">
      <div className="mx-auto max-w-7xl">
        <div className="text-center px-6 sm:px-8 lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg sm:text-xl text-gray-500 sm:mt-4">
            {description}
          </p>
        </div>
        <div className="sm:px-8 lg:px-10">
        <YouTube className="mx-auto mt-12" videoId={videoId} />
        </div>
      </div>
    </div>
  )
}
