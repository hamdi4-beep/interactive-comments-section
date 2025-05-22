import { createProps } from "./CommentComponent"
import ProfileHeader from "./subcomponents/ProfileHeader"
import ReplyButton from "./subcomponents/ReplyButton"
import FormComponent from "./FormComponent"
import * as React from 'react'

type Userreply = {
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

type UserReply = Omit<Userreply, 'replies'> & {
    replyingTo: string
}

function Reply({
    reply
}: {
    reply: UserReply
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const props = createProps(reply)

    return (
        <div className="reply-wrapper">
            <div className="card">
                <ProfileHeader {...props}>
                    <ReplyButton toggleReply={e => setIsReplying(prev => !prev)} />
                </ProfileHeader>

                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </div>

            {isReplying && <FormComponent />}
        </div>
    )
}

export default Reply