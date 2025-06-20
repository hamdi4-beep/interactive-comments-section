import { useReplies } from "../hooks/useReplies"
import Card from "./Card"

function Reply({
    id
}: {
    id: number
}) {
    const {replies} = useReplies()
    const reply = replies.byId[id]
    
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