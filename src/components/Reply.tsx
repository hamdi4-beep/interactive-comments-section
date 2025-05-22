import { ProfileHeader, ReplyButton } from "./Comment"
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

    const props = {
        avatar: reply.user.image.png,
        username: reply.user.username,
        date: reply.createdAt
    }

    return (
        <div className="reply-wrapper">
            <div className="reply">
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