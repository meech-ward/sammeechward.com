
import normalizeImageSize from '../../helpers/normalizeImageSize'
export default function Meta({ title, description, image, imageWidth, imageHeight, url }) {

  const imageSize = normalizeImageSize({ width: imageWidth, height: imageHeight, maxWidth: 1200 })
  return (<>
    <meta name="description" content={description} />

    {/*<!-- Google / Search Engine Tags -->*/}
    <meta itemprop="name" content={title} />
    <meta itemprop="description" content={description} />
    <meta itemprop="image" content={image} />

    {/*<!-- Facebook Meta Tags -->*/}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:image:width" content={imageSize.width} />
    <meta property="og:image:height" content={imageSize.height} />
    <meta property="og:type" content="website" />

    {/*<!-- Twitter Meta Tags -->*/}
    <meta name="twitter:card" content="summary_large_image" />
  </>
  )
}