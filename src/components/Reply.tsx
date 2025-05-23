import { createProps } from "./Comment"
import ProfileHeader from "./subcomponents/ProfileHeader"
import ReplyButton from "./subcomponents/ReplyButton"
import FormComponent from "./FormComponent"
import * as React from 'react'
import ScoreComponent from "./subcomponents/ScoreComponent"

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

    return (
        <div className="reply-wrapper">
            <div className="card">
                <ScoreComponent score={reply.score} />

                <div className="content">
                    <ProfileHeader {...createProps(reply)}>
                        <ReplyButton toggleReply={e => setIsReplying(prev => !prev)} />
                    </ProfileHeader>

                    <p>
                        <span className="replying-to">@{reply.replyingTo} </span>
                        {reply.content}
                    </p>
                </div>
            </div>

            {isReplying && <FormComponent dispatchHandler={() => console.log('This method adds a reply to a reply.')} />}
        </div>
    )
}

export default Reply