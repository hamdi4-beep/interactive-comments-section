import FormComponent from "./FormComponent"
import ProfileHeader from "./subcomponents/ProfileHeader"
import ReplyButton from "./subcomponents/ReplyButton"
import Reply from "./ReplyComponent"
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

export const createProps = (info: {
    user: {
        image: {
            png: string
        }
        username: string
    }
    createdAt: string
}) => ({
    avatar: info.user.image.png,
    username: info.user.username,
    date: info.createdAt
})

function Comment({
    comment
}: {
    comment: UserComment
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const props = createProps(comment)

    return (
        <div className="comment-wrapper">
            <div className="card">
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