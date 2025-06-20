import { useComments } from '../hooks/useComments'
import Comment from './Comment'

function CommentsList() {
    const {comments} = useComments()

    return (
        <div className="comments-list">
            {comments.allId.map(id => (
                <Comment
                    id={id.toString()}
                    key={id}
                />
            ))}
        </div>
    )
}

export default CommentsList