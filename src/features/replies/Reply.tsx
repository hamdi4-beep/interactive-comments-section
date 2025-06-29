import { useAppDispatch, useAppSelector, useNextId } from "../../hooks"
import Card from "../../components/Card"
import { replyCreated, replyEdited, type UserReply } from "./RepliesSlice"
import type { UserComment } from "../comments/CommentsSlice"
import React from "react"

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

    const replyToReply = React.useCallback(
        (content: string) =>
            dispatch(replyCreated({
                id: nextId,
                parentCommentId,
                content,
                user: reply.user
            })),
        []
    )

    const editReply = React.useCallback(
        (content: string) =>
            dispatch(replyEdited({
                id,
                content
            })),
        []
    )

    return (
        <div className="reply-wrapper">
            <Card item={reply} handleReplyDispatch={replyToReply} handleEditDispatch={editReply} handleDeleteDispatch={() => {}}>
                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </Card>
        </div>
    )
}

export default Reply