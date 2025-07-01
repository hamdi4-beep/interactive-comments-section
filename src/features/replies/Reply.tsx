import { useAppDispatch, useAppSelector, useNextId } from "../../hooks"
import Card from "../../components/Card"
import { replyCreated, replyDeleted, replyEdited, replyScoreUpdated, type UserReply } from "./RepliesSlice"
import type { UserComment } from "../comments/CommentsSlice"
import * as React from 'react'

const Reply = React.memo(function Reply({
    id,
    parentCommentId
}: {
    id: UserReply['id']
    parentCommentId: UserComment['id']
}) {
    const dispatch = useAppDispatch()
    const nextId = useNextId()
    const reply = useAppSelector(state => state.replies.byId[id])

    const replyToReplyHandler = React.useCallback(
        (content: string) =>
            dispatch(replyCreated({
                id: nextId,
                parentCommentId,
                content,
                user: reply.user
            })),
        []
    )

    const editReplyHandler = React.useCallback(
        (content: string) =>
            dispatch(replyEdited({
                id,
                content
            })),
        []
    )

    const deleteReplyHandler = React.useCallback(
        () =>
            dispatch(replyDeleted({
                id,
                parentCommentId
            })),
        []
    )

    const voteReplyHandler = React.useCallback(
        (score: number) =>
            dispatch(replyScoreUpdated({
                id,
                score
            })),
        []
    )

    if (!reply) return

    return (
        <div className="reply-wrapper">
            <Card
                item={reply}
                handleReplyDispatch={replyToReplyHandler}
                handleEditDispatch={editReplyHandler}
                handleDeleteDispatch={deleteReplyHandler}
                handleVoteDispatch={voteReplyHandler}
            >
                <p>
                    <span className="replying-to">@{reply.replyingTo} </span>
                    {reply.content}
                </p>
            </Card>
        </div>
    )
})

export default Reply