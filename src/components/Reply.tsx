import { ComponentHeader } from "./Composition"

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

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

function Reply({
    reply
}: {
    reply: UserReply
}) {
    const props = {
        avatar: reply.user.image.png,
        date: reply.createdAt,
        username: reply.user.username
    }

    return (
        <div className="reply">
            <ComponentHeader {...props} />

            <div className="content">
                <p>@{reply.replyingTo} {reply.content}</p>
            </div>
        </div>
    )
}

export default Reply