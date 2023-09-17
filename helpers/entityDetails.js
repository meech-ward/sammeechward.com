import path from 'path'

function entityUrlPath(entity) {
  if (entity.type === 'playlist') {
    return '/playlists/'
  }
  return '/'
}

const entityDetails = function (entity) {
  if (!entity) {
    throw "entityDetails: entity is undefined"
  }
  // console.log(entity.image.url, process.env.NEXT_PUBLIC_MDX_ROOT_URL)
  const imageUrl = entity.image.url ? new URL(path.join(process.env.NEXT_PUBLIC_MDX_ROOT_URL, entity.image.url)).href : null
  return {
    id: entity.slug,
    ...entity,
    href: entityUrlPath(entity)+entity.slug,
    image: {
      ...entity.image,
      url: imageUrl 
    },
    editUrl: entity.indexPath ? new URL(path.join(process.env.NEXT_PUBLIC_MDX_ROOT_URL, entity.indexPath)).href: null,
    rootImagesUrl: entity.imagesPath ? new URL(path.join(process.env.NEXT_PUBLIC_MDX_ROOT_URL, entity.imagesPath)).href: null,
    indexUrl: entity.indexPath ? new URL(path.join(process.env.NEXT_PUBLIC_MDX_ROOT_URL, entity.indexPath)).href: null,
    dirUrl: entity.dirPath ? new URL(path.join(process.env.NEXT_PUBLIC_MDX_ROOT_URL, entity.dirPath)).href: null,
    rootUrl: process.env.NEXT_PUBLIC_MDX_ROOT_URL,
  }
}

export default entityDetails