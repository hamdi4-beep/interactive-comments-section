import { useComments } from '../hooks/useComments'
import Card from './Card'
import Reply from './Reply'

function Comment(props: {
    id: string
}) {
    const {comments} = useComments()
    const comment = comments.byId[props.id]

    return (
        <div className="comment-wrapper">
            <Card item={comment}>
                <p>{comment.content}</p>
            </Card>

            <div className="replies-list">
                {comment.replies.map(id => (
                    <Reply
                        id={id}
                        parentCommentId={comment.id}
                        key={id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comment