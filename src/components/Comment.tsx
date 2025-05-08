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
    replies?: Array<UserReply>
}

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

function ReplyButton() {
    return (
        <button>
            <div className="icon-wrapper">
                <img src="/images/icon-reply.svg" alt="" />
            </div>

            Reply
        </button>
    )
}

export const ButtonsWrapper = () => (
    <div className="buttons-wrapper">
        <ReplyButton />
    </div>
)

export const ScoreComponent = ({
    score
}: {
    score: number
}) => (
    <div className="score-wrapper">
        <button>
            <div className="icon-wrapper">
                <img src='/images/icon-plus.svg' alt="" />
            </div>
        </button>

        <span>{score}</span>

        <button>
            <div className="icon-wrapper">
                <img src="/images/icon-minus.svg" alt="" />
            </div>
        </button>
    </div>
)

export const User = ({
    user
}: {
    user: UserComment['user']
}) => (
    <>
        <div className="user-avatar">
            <img src={user.image.png} alt="" />
        </div>

        <h3>{user.username}</h3>
    </>
)

function Reply({
    reply
}: {
    reply: UserReply
}) {
    return (
        <div className="comment">
            <ScoreComponent score={reply.score} />

            <div className="content">
                <div className="user-wrapper">
                    <User user={reply.user} />
                    <span className="comment-date">{reply.createdAt}</span>
                    <ReplyButton />
                </div>

                <p>
                    <span>@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </div>
        </div>
    )
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
                <ScoreComponent score={comment.score} />

                <div className="content">
                    <div className="user-wrapper">
                        <User user={comment.user} />
                        <span className="comment-date">{comment.createdAt}</span>
                        <ReplyButton />
                    </div>

                    <p>{comment.content}</p>
                </div>
            </div>

            {hasReplies && (
                <div className="replies-list">
                    {comment.replies?.map(reply => (
                        <Reply
                            reply={reply}
                            key={reply.id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment