import fp from 'lodash/fp'

const entityDetails = fp.curry(function (type, entity) {
  return {
    ...entity,
    href: `/${type}/${entity.slug}`,
    imageUrl: entity.imageUrl && new URL(entity.imageUrl, process.env.MDX_ROOT_URL).href,
    editUrl: new URL(entity.indexPath, process.env.MDX_REPO_URL).href ,
  }
})

export default entityDetails