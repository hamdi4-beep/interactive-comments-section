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

const RepliesList = ({
    replies
}: {
    replies: UserReply[]
}) => {
    return (
        <div className="replies-list">
            {replies.map(reply => (
                <Reply
                    reply={reply}
                    key={reply.id} 
                />
            ))}
        </div>
    )
}

export const ScoreComponent = ({
    score
}: {
    score: number
}) => {
    return (
        <div className="score-wrapper">
            <button>
                <div className="icon-wrapper">
                    <img src="/images/icon-plus.svg" alt="" />
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
                <ScoreComponent score={comment.score} />

                <div>
                    <ComponentHeader {...props} />
                
                    <div className="content">
                        <p>{comment.content}</p>
                    </div>
                </div>
            </div>

            <RepliesList replies={comment.replies} />
        </div>
    )
}

export default Comment