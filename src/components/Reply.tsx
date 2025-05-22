import { ProfileHeader } from "./Comment"

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
    const props = {
        avatar: reply.user.image.png,
        username: reply.user.username,
        date: reply.createdAt
    }

    return (
        <div className="reply">
            <ProfileHeader {...props} />
            
            <p>
                <span className="replying-to">@{reply.replyingTo} </span>
                {reply.content}
            </p>
        </div>
    )
}

export default Reply