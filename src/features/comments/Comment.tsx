import Card from '../../components/Card'
import Reply from '../replies/Reply'
import { useAppSelector } from '../../hooks'

function Comment(props: {
    id: string
}) {
    const comment = useAppSelector(state => state.comments.byId[props.id])

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