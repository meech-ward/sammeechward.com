import axios from 'axios'

export async function getPost(post) {
  const res = await axios.get(post.indexUrl)
  return {
    ...post,
    markdown: res.data
  }
}
