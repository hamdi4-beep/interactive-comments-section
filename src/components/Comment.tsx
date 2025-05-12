import Reply from "./Reply"

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

export const ComponentHeader = (props: {
    avatar: string
    username: string
    date: string
}) => {
    return (
        <div className="component-header">
            <div className="user-wrapper">
                <div className="user-avatar">
                    <img src={props.avatar} alt="" />
                </div>

                <h3>{props.username}</h3>
                <span className="comment-date">{props.date}</span>
            </div>

            <div className="buttons-wrapper">
                <button>
                    <div className="icon-img">
                        <img src="/images/icon-reply.svg" alt="" />
                    </div>

                    Reply
                </button>
            </div>
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
        date: comment.createdAt,
        username: comment.user.username
    }

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <ComponentHeader {...props} />
            
                <div className="content">
                    <p>{comment.content}</p>
                </div>
            </div>

            <div className="replies-list">
                {comment.replies.map(reply => (
                    <Reply reply={reply} key={reply.id} />
                ))}
            </div>
        </div>
    )
}

export default Comment