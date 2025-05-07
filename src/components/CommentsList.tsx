import Comment from './Comment'
import data from '../data.json'

function CommentsList() {
    return (
        <div className="comments-list">
            {data.comments.map(comment => (
                <Comment 
                    comment={comment}
                    key={comment.id}
                />
            ))}
        </div>
    )
}

export default CommentsList