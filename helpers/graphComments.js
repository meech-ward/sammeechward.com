// Map the comments array into a graph


export default function graphComments(_comments) {
  let comments = [..._comments]

  // Make the graph
  const commentsObj = {}
  comments.forEach(c => {
    commentsObj[c.id] = c
  })

  // Link up all children
  comments.forEach(c => {
    if (!c.respondingToComment) {
      return
    }
    
    // const parent = commentsObj[c.respondingToComment.id]

    // flatten the replies by going to the top level parent
    // This just works because they're ordered by date, so the parent will always be before the child
    let parent = c
    while (parent.respondingToComment) {
      parent = commentsObj[parent.respondingToComment.id]
    }
    parent.replies = parent.replies || []

    // If the root node contains the parent of the current comment, add it immediately after to the parent
    const parentIndex = parent.replies.findIndex(r => r.id === c.respondingToComment.id)
    if (parentIndex !== -1) {
      parent.replies.splice(parentIndex + 1, 0, c)
    } else {
      parent.replies.push(c)
    }

  })

  // Remove children from the array because they're linked through the graph
  comments = comments.filter(c => !c.respondingToComment)

  return comments
}