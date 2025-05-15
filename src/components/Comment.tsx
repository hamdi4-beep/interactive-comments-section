import Layout from "./Layout"

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

type UserComment = {
  id: number
  content: string
  createdAt: string
  score: number
  user: {
    image: {
      png: string
      webp: string
    }
    username: string
  }
  replies: Array<UserReply>
}

function Reply({
    reply
}: {
    reply: UserReply
}) {
    const props = {
        avatar: reply.user.image.png,
        username: reply.user.username,
        date: reply.createdAt
    }

    return (
        <div className="reply-wrapper">
            <Layout {...props}>
                <p>
                    <span className="mention">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </Layout>
        </div>
    )
}

function Comment({
    comment
}: {
    comment: UserComment
}) {
    const props = {
        avatar: comment.user.image.png,
        username: comment.user.username,
        date: comment.createdAt
    }

    return (
        <div className="comment-wrapper">
            <Layout {...props}>
                <p>{comment.content}</p>
            </Layout>

            <div className="replies-list">
                {comment.replies.map(reply =>
                    <Reply
                        reply={reply}
                        key={reply.id}
                    />
                )}
            </div>
        </div>
    )
}

export default Comment