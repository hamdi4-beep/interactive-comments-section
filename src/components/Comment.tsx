import { CommentInterface } from "../interfaces/CommentInterface"
import { Card } from "./Card"

type CommentProp = {
    comment: CommentInterface
}

export default function Comment({ comment }: CommentProp): JSX.Element {
    const { replies } = comment

    return (
        <div className="comment">
            <Card comment={comment} />
            
            {replies.length > 0 && replies.map((reply: CommentInterface, i: number) => {
                return (
                    <Card comment={reply} key={i} />
                )
            })}
        </div>
    )
}