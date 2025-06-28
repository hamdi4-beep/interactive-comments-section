import { useAppSelector } from "../../hooks"
import Card from "../../components/Card"
import type { UserReply } from "./RepliesSlice"

function Reply({
    id
}: {
    id: UserReply['id']
}) {
    const reply = useAppSelector(state => state.replies.byId[id])

    const handleReply = () =>
        console.log('This action is handled by the Reply component!')

    return (
        <div className="reply-wrapper">
            <Card item={reply} handleDispatch={handleReply}>
                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </Card>
        </div>
    )
}

export default Reply