import fp from 'lodash/fp'

const entityDetails = function (entity) {
  return {
    id: entity.slug,
    ...entity,
    href: `/${entity.slug}`,
    image: {
      ...entity.image,
      url: entity.image.url && new URL(entity.image.url, process.env.NEXT_PUBLIC_MDX_ROOT_URL).href,
    },
    editUrl: new URL(entity.indexPath, process.env.NEXT_PUBLIC_MDX_REPO_URL).href,
    rootImagesUrl: new URL(entity.imagesPath, process.env.NEXT_PUBLIC_MDX_ROOT_URL).href,
    indexUrl: new URL(entity.indexPath, process.env.NEXT_PUBLIC_MDX_ROOT_URL).href,
    dirUrl: new URL(entity.dirPath, process.env.NEXT_PUBLIC_MDX_ROOT_URL).href,
    rootUrl: process.env.NEXT_PUBLIC_MDX_ROOT_URL,
  }
}

export default entityDetails