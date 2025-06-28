import { useAppDispatch, useAppSelector, useNextId } from "../../hooks"
import Card from "../../components/Card"
import { replyCreated, type UserReply } from "./RepliesSlice"
import type { UserComment } from "../comments/CommentsSlice"

function Reply({
    id,
    parentCommentId
}: {
    id: UserReply['id']
    parentCommentId: UserComment['id']
}) {
    const dispatch = useAppDispatch()
    const nextId = useNextId()
    const reply = useAppSelector(state => state.replies.byId[id])

    const handleReply = (content: string) =>
        dispatch(replyCreated({
            id: nextId,
            itemId: parentCommentId,
            content,
            user: reply.user
        }))

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