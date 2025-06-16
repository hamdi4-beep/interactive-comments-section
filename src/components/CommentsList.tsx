import Comment from './Comment'

import type { ReducerActions } from '../reducers/reducer'
import * as React from 'react'
import { CommentStateContext } from './CommentSection'

function CommentsList() {
    const {comments} = React.useContext(CommentStateContext)

    return (
        <div className="comments-list">
            {comments.map(comment => (
                <Comment
                    comment={comment}
                    key={comment.id}
                />
            ))}
        </div>
    )
}

export default CommentsList