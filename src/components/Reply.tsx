import Card from "./Card"
import type { UserReply } from "../App"

function Reply({
    reply
}: {
    reply: UserReply
}) {
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