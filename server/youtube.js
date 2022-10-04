import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export async function getComments(videoId) {
  const res = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId,
    maxResults: 100,
  })
  return res.data.items
  .map(item => ({
    ...item.snippet.topLevelComment.snippet,
    id: item.id
  }))
  .map(comment => ({
    image: comment.authorProfileImageUrl,
    created: comment.publishedAt,
    text: comment.textOriginal,
    name: comment.authorDisplayName,
    id: comment.id,
    likeCount: comment.likeCount,
    videoId: comment.videoId,
  }))
}




