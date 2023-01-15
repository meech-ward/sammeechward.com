export function sanitizeDynamoObject(obj) {
  obj = {...obj}

  if (!obj.id) {
    obj.id = obj.pk.split('#')[1]
  }

  delete obj.pk
  delete obj.sk
  delete obj.GSI1PK
  delete obj.GSI1SK
  delete obj.GSI2PK
  delete obj.GSI2SK

  return obj
}

export function mapComment(comment) {
  const obj = {
    ...comment,
    id: comment.sk.split("#")[1]
  }

  return sanitizeDynamoObject(obj)
}

export function mapPost(post) {
  const obj = {
    ...post,
    id: post.slug
  }

  return sanitizeDynamoObject(obj)
}

export function mapFeatured(post) {
  const obj = {
    ...post,
    id: post.sk.split("#")[1]
  }

  return sanitizeDynamoObject(obj)
}

export function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}