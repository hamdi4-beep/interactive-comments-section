import * as React from 'react'
import Reply from "./Reply"
import FormComponent from './FormComponent'

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
    handleReplyClick: React.MouseEventHandler
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
                <button onClick={props.handleReplyClick}>
                    <div className="icon-img">
                        <img src="/images/icon-reply.svg" alt="" />
                    </div>

                    Reply
                </button>
            </div>
        </div>
    )
}

export const ScoreComponent = ({
    score
}: {
    score: number
}) => {
    const [currentScore, setCurrentScore] = React.useState(score)

    return (
        <div className="score-wrapper">
            <button onClick={e => setCurrentScore(previousScore => previousScore + 1)} title='increase score'>
                <div className="icon-wrapper">
                    <img src="/images/icon-plus.svg" alt="" />
                </div>
            </button>

            <span>{currentScore}</span>

            <button onClick={e => setCurrentScore(previousScore => previousScore - 1)} title='decrease score'>
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
    const [isReplying, setIsReplying] = React.useState(false)

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
                    <ComponentHeader
                        handleReplyClick={e => setIsReplying(prev => !prev)}
                        {...props}
                    />
                
                    <div className="content">
                        <p>{comment.content}</p>
                    </div>
                </div>
            </div>

            {isReplying && <FormComponent />}

            <div className="replies-list">
                {comment.replies.map(reply => (
                    <Reply
                        reply={reply}
                        updateReply={() => console.log(comment.replies.includes(reply))}
                        key={reply.id} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Comment