import {getComments} from '../../../server/youtube'

export default async function handler(req, res) {
  const [videoId, entities] = req.query.video
  if (entities === 'comments') {
    const comments = await getComments(videoId)
    res.status(200).json({comments})
    return
  }
  console.log([videoId, entities])
  res.status(404).json({ })
}
