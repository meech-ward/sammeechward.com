import fp from 'lodash/fp'

const entityDetails = function (entity) {
  return {
    id: entity.slug,
    ...entity,
    href: `/${entity.slug}`,
    image: {
      ...entity.image,
      url: entity.image.url && new URL(entity.image.url, process.env.MDX_ROOT_URL).href,
    },
    editUrl: new URL(entity.indexPath, process.env.MDX_REPO_URL).href,
    rootImagesUrl: new URL(entity.imagesPath, process.env.MDX_ROOT_URL).href,
    rootUrl: process.env.MDX_ROOT_URL,
  }
}

export default entityDetails