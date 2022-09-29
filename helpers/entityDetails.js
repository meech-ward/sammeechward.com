import fp from 'lodash/fp'

const entityDetails = fp.curry(function (type, entity) {
  return {
    ...entity,
    href: `/${type}/${entity.slug}`,
    image: {
      ...entity.image,
      url: entity.image.url && new URL(entity.image.url, process.env.MDX_ROOT_URL).href,
    },
    editUrl: new URL(entity.indexPath, process.env.MDX_REPO_URL).href ,
  }
})

export default entityDetails