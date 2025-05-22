import FormComponent from "./FormComponent"
import Reply from "./Reply"
import * as React from 'react'

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

export const ProfileHeader = (props: {
    avatar: string
    username: string
    date: string
    children: React.ReactNode
}) => (
    <div className="profile-header">
        <div className="user">
            <div className="user-img">
                <img src={props.avatar} alt="" />
            </div>

            <h3>{props.username}</h3>
            <span className="comment-date">{props.date}</span>
        </div>

        <div className="actions">
            {props.children}
        </div>
    </div>
)

export const ReplyButton = (props: {
    toggleReply: React.MouseEventHandler
}) => (
    <button onClick={props.toggleReply}>
        <div className="icon-img">
            <img src="/images/icon-reply.svg" alt="" />
        </div>

        Reply
    </button>
)

function Comment({
    comment
}: {
    comment: UserComment
}) {
    const [isReplying, setIsReplying] = React.useState(false)

    const props = {
        avatar: comment.user.image.png,
        username: comment.user.username,
        date: comment.createdAt
    }

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <ProfileHeader {...props}>
                    <ReplyButton toggleReply={e => setIsReplying(prev => !prev)} />
                </ProfileHeader>

                <p>{comment.content}</p>
            </div>

            {isReplying && <FormComponent />}

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