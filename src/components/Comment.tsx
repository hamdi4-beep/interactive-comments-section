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

function Layout(props: {
    info: {
        avatar: string
        date: string
        username: string
    }
    children: React.ReactNode
}) {
    return (
        <div className="layout">
            <div className="profile-header">
                <div className="user">
                    <div className="user-img">
                        <img src={props.info.avatar} alt="" />
                    </div>

                    <h3>{props.info.username}</h3>
                    <span className="comment-date">{props.info.date}</span>
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

            {props.children}
        </div>
    )
}

function Reply({
    reply
}: {
    reply: UserReply
}) {
    return (
        <div className="reply">
            <Layout info={{
                avatar: reply.user.image.png,
                username: reply.user.username,
                date: reply.createdAt
            }}>
                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
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
    return (
        <div className="comment-wrapper">
            <div className="comment">
                <Layout info={{
                    avatar: comment.user.image.png,
                    username: comment.user.username,
                    date: comment.createdAt
                }}>
                    <p>{comment.content}</p>
                </Layout>
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