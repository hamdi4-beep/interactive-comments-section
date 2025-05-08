import { ScoreComponent, User, ButtonsWrapper } from "./Comment"
import { currentUser } from "./CommentsList"

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
    replies?: Array<UserReply>
}

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

function CurrentUserComment({
    comment
}: {
    comment: UserComment
}) {
    return (
        <div className="comment-wrapper">
            <div className="comment">
                <ScoreComponent score={comment.score} />

                <div className="content">
                    <div className="user-wrapper">
                        <User user={currentUser} />
                        <span className="comment-date">{comment.createdAt}</span>
                        <ButtonsWrapper />
                    </div>

                    <p>{comment.content}</p>
                </div>
            </div>
        </div>
    )
}

export default CurrentUserComment