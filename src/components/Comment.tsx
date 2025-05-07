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
    replies?: Array<{
      id: number
      content: string
      createdAt: string
      score: number
      replyingTo: string
      user: {
        image: {
          png: string
          webp: string
        }
        username: string
      }
    }>
}

function Comment({
    comment
}: {
    comment: UserComment
}) {
    const hasReplies = comment.replies && comment.replies.length > 0

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="score-wrapper">
                    <button>
                        <div className="icon-wrapper">
                            <img src='/images/icon-plus.svg' alt="" />
                        </div>
                    </button>

                    <span>{comment.score}</span>

                    <button>
                        <div className="icon-wrapper">
                            <img src="/images/icon-minus.svg" alt="" />
                        </div>
                    </button>
                </div>

                <div className="content">
                    <div className="user-wrapper">
                        <div className="user-avatar">
                            <img src={comment.user.image.png} alt="" />
                        </div>

                        <h3>{comment.user.username}</h3>
                        <span className="comment-date">{comment.createdAt}</span>

                        <div className="buttons-wrapper">
                            <button>
                                <div className="icon-wrapper">
                                    <img src="/images/icon-reply.svg" alt="" />
                                </div>

                                Reply
                            </button>
                        </div>
                    </div>

                    <p>{comment.content}</p>
                </div>
            </div>

            {hasReplies && (
                <div className="replies-list">
                    {comment.replies?.map(reply => (
                        <Comment
                            comment={reply}
                            key={reply.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment