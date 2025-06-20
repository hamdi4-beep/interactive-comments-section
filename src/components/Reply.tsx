import { useReplies } from "../hooks/useReplies"
import Card from "./Card"

function Reply({
    id,
    parentCommentId
}: {
    id: number
    parentCommentId: number
}) {
    const {replies} = useReplies()
    const reply = replies.byId[id]

    console.log(parentCommentId)

    return (
        <div className="reply-wrapper">
            <Card item={reply}>
                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </Card>
        </div>
    )
}

export default Reply