type UserReply = {
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
  replies: Array<Omit<UserComment, 'replies'> & UserReply>
}

function Comment({
    data,
    children
}: {
    data: any,
    children?: React.ReactNode
}) {
    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="user-wrapper">
                    <div className="user-img">
                        <img src={data.image} alt="" />
                    </div>

                    <h3>{data.username}</h3>
                    <span>{data.date}</span>
                </div>

                <div className="buttons">
                    <button>
                        <div className="icon-wrapper">
                            <img src="/images/icon-reply.svg" alt="reply icon" />
                        </div>

                        Reply
                    </button>
                </div>
            </div>

            {children}
        </div>
    )
}

function Composition({
    comment
}: {
    comment: UserComment
}) {
    const hasReplies = comment.replies.length > 0

    return (
        <div className="composition">
            <Comment
                data={{
                    username: comment.user.username,
                    image: comment.user.image.png,
                    date: comment.createdAt
                }}
            />

            {hasReplies && (
                <div className="replies-list">
                    <p>The comment has replie(s)</p>
                </div>
            )}
        </div>
    )
}

export default Composition