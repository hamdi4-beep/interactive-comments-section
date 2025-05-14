import { ComponentHeader, ScoreComponent } from "./Comment"

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
    reply,
    updateReply
}: {
    reply: UserReply
    updateReply: Function
}) {
    const props = {
        avatar: reply.user.image.png,
        date: reply.createdAt,
        username: reply.user.username
    }

    return (
        <div className="reply" onClick={e => updateReply()}>
            <ScoreComponent score={reply.score} />
            
            <div>
                <ComponentHeader {...props} />

                <div className="content">
                    <p>
                        <span className="replying-to">@{reply.replyingTo} </span>
                        {reply.content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Reply