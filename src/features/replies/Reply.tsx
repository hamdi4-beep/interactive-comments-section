import { useAppSelector } from "../../hooks"
import Card from "../../components/Card"

function Reply({
    id,
    parentCommentId
}: {
    id: number
    parentCommentId: number
}) {
    const reply = useAppSelector(state => state.replies.byId[id])
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