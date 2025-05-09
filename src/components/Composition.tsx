type UserComment = {
    "id": number,
    "content": string
    "createdAt": string,
    "score": number,
    "user": {
        "image": { 
            "png": string,
            "webp": string
        },
        "username": string
    },
    "replies": Array<Omit<UserComment, 'replies'> & {
        replyingTo: string
    }>
}

const CommentHeader = ({
    info
}: {
    info: {
        username: string
        image: string
        createdAt: string
    }
}) => (
    <div className="comment-header">
        <div className="user">
            <div className="user-img">
                <img src={info.image} alt="" />
            </div>

            <h3>{info.username}</h3>
        </div>

        <span className="comment-date">{info.createdAt}</span>
    </div>
)

function Reply({
    reply
}: {
    reply: Omit<UserComment, 'replies'> & {
        replyingTo: string
    }
}) {
    return (
        <div className="reply">
            <CommentHeader
                info={{
                    username: reply.user.username,
                    image: reply.user.image.png,
                    createdAt: reply.createdAt
                }}
            />
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
                <CommentHeader
                    info={{
                        username: comment.user.username,
                        image: comment.user.image.png,
                        createdAt: comment.createdAt
                    }}
                />

                <p>{comment.content}</p>
            </div>
        </div>
    )
}

function Composition({
    comment
}: {
    comment: UserComment
}) {
    console.log(comment)

    return (
        <div className="composition">
            <Comment comment={comment} />
        </div>
    )
}

export default Composition