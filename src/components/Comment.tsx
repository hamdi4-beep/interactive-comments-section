import { useComments } from '../hooks/useComments'
import Card from './Card'

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
        </div>
    )
}

export default Comment