import Reply from "./Reply"
import Card from './Card'

import type { UserComment } from "../types/UserComment"

function Comment(props: {
    comment: UserComment
}) {
    return (
        <div className="comment-wrapper">
            <Card item={props.comment}>
                <p>{props.comment.content}</p>
            </Card>

            <div className="replies-list">
                {props.comment.replies.map(reply => (
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