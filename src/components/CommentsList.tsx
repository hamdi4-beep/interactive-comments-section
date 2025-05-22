import { Context } from '../App'
import Comment from './Comment'
import * as React from 'react'

function CommentsList() {
    const {comments} = React.useContext(Context)
    console.log(comments)

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