import axios from 'axios'

export async function getPost(post) {
  const url = new URL(post.indexPath, process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return {
    ...post,
    markdown: res.data
  }
}
