import * as React from 'react'
import Card from '../../components/Card'
import Reply from '../replies/Reply'
import { useAppDispatch, useAppSelector, useNextId } from '../../hooks'
import { commentDeleted, commentEdited, type UserComment } from './CommentsSlice'
import { replyCreated } from '../replies/RepliesSlice'

function Comment(props: {
    id: UserComment['id']
}) {
    const dispatch = useAppDispatch()
    const nextId = useNextId()

    const [isRepliesHidden, setIsRepliesHidden] = React.useState(true)
    const comment = useAppSelector(state => state.comments.byId[props.id])

    const replyToComment = React.useCallback(
        (content: string) =>
            dispatch(replyCreated({
                id: nextId,
                parentCommentId: props.id,
                content,
                user: comment.user
            })),
        []
    )

    const editComment = React.useCallback(
        (content: string) =>
            dispatch(commentEdited({
                id: props.id,
                content
            })),
        []
    )

    const deleteComment = React.useCallback(
        () =>
            dispatch(commentDeleted({
                id: props.id
            })),
        []
    )

    return (
        <div className="comment-wrapper">
            <Card item={comment} handleReplyDispatch={replyToComment} handleEditDispatch={editComment} handleDeleteDispatch={deleteComment}>
                <p>{comment.content}</p>
            </Card>

            {comment.replies.length > 0 && <button className='view-replies-btn' onClick={() => setIsRepliesHidden(prev => !prev)}>{comment.replies.length} replies</button>}

            {!isRepliesHidden && (
                <div className="replies-list">
                    {comment.replies.map(id => (
                        <Reply
                            id={id}
                            parentCommentId={comment.id}
                            key={id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment