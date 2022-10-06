import {getComments} from '../../../server/youtube'

export default async function handler(req, res) {
  const [videoId, entities] = req.query.video
  if (entities === 'comments') {
    const { commentsAndReplies, totalCommentsAndReplies } = await getComments(videoId)
    res.status(200).json({ commentsAndReplies, totalCommentsAndReplies })
    return
  }
  // console.log([videoId, entities])
  res.status(404).json({ })
}
