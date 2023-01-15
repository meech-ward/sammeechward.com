import {serializeMD} from './serializeMDX'

/*
 * use serializeMDX to convert the text and the replies' text to html
 */
export default async function mapComment(comment) {
  let mdxSource = ""
  try {
    mdxSource = await (serializeMD(comment.text).catch(() => serializeMD("```md\n" + comment.text + "\n```")))
    if (comment.replies) {
      comment.replies = await Promise.all(comment.replies.map(mapComment))
    }
  } catch (e) {
    // console.log("serializeMDX error:", e) 
  }
  return {
    ...comment,
    mdxSource
  }
}