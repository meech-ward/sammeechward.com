import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export async function getCommentsAndReplies(videoId) {

}

function mapCommentItem(comment) {
  const snippet = comment.snippet
  return {
    ...snippet,
    id: comment.id,
    image: snippet.authorProfileImageUrl,
    created: snippet.publishedAt,
    text: snippet.textOriginal,
    name: snippet.authorDisplayName,
    likeCount: snippet.likeCount,
    videoId: snippet.videoId,
  }
}

function mapCommentResult(item) {
  const replies = item.replies?.comments?.reverse().map(mapCommentItem) || []
  return {
    ...mapCommentItem(item.snippet.topLevelComment),
    replies
  }
}

export async function getComments(videoId) {
  const res = await youtube.commentThreads.list({
    part: ['snippet', 'replies'],
    videoId,
    maxResults: 100,
  })

  const commentsAndReplies = res.data.items.reverse().map(mapCommentResult)
  const totalCommentsAndReplies = commentsAndReplies.map(a => 1 + a.replies?.length).reduce((a, b) => a + b, 0)

  return { commentsAndReplies, totalCommentsAndReplies }
}




