type UserComment = {
    id: number
    createdAt: string
    score: number
    content: string
    user: {
        username: string
        image: {
            png: string
            webp: string
        }
    }
    replies: UserReply[]
}

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

const ProfileHeader = (props: {
    avatar: string
    username: string
    date: string
}) => (
    <div className="profile-header">
        <div className="user">
            <div className="user-img">
                <img src={props.avatar} alt="" />
            </div>

            <h3>{props.username}</h3>
            <span>{props.date}</span>
        </div>

        <div className="actions">
            <button>
                <div className="icon-img">
                    <img src="/images/icon-reply" alt="" />
                </div>

                Reply
            </button>
        </div>
    </div>
)

function Reply({
    reply
}: {
    reply: UserReply
}) {
    const info = {
        avatar: reply.user.image.png,
        username: reply.user.username,
        date: reply.createdAt
    }

    return (
        <div className="reply">
            <ProfileHeader {...info} />
            <p>@{reply.replyingTo} {reply.content}</p>
        </div>
    )
}

function Comment({
    comment
}: {
    comment: UserComment
}) {
    const info = {
        avatar: comment.user.image.png,
        username: comment.user.username,
        date: comment.createdAt
    }

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <ProfileHeader {...info} />
                <p>{comment.content}</p>
            </div>

            <div className="replies-list">
                {comment.replies.map(reply => (
                    <Reply
                        reply={reply}
                        key={reply.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comment