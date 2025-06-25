import * as React from 'react'
import Card from '../../components/Card'
import Reply from '../replies/Reply'
import { useAppSelector } from '../../hooks'

function Comment(props: {
    id: number
}) {
    const [isRepliesHidden, setIsRepliesHidden] = React.useState(true)
    const comment = useAppSelector(state => state.comments.byId[props.id])

    console.log(comment)

    return (
        <div className="comment-wrapper">
            <Card item={comment}>
                <p>{comment.content}</p>
            </Card>

            {comment.replies.length > 0 && <button className='view-replies-btn' onClick={() => setIsRepliesHidden(prev => !prev)}>{comment.replies.length} replies</button>}

            {!isRepliesHidden && (
                <div className="replies-list">
                    {comment.replies.map(id => (
                        <Reply
                            id={id}
                            key={id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment