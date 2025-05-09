import data from '../data.json'
import Composition from './Composition'

export const currentUser = data.currentUser

function CommentsList() {
    return (
        <div className="comments-list">
            {data.comments.map(comment => (
                <Composition
                    comment={comment}
                    key={comment.id}
                />
            ))}
        </div>
    )
}

export default CommentsList