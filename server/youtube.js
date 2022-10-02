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
    ...comment,
    text: comment.textDisplay,
    profileImageUrl: comment.authorProfileImageUrl,
    displayName: comment.authorDisplayName,
  }))
}