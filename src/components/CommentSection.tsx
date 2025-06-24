import { commentCreated } from "../features/comments/CommentsSlice";
import { useAppDispatch, useNextId } from "../hooks";
import CommentsList from "./CommentsList";
import FormComponent from "./FormComponent";

function CommentSection() {
    const dispatch = useAppDispatch()
    const nextId = useNextId()

    console.log(nextId)

    return (
        <div className="comment-section">
            <CommentsList />

            <FormComponent
                placeholderValue='Add a comment...'
                dispatchHandler={(content: string) => dispatch(commentCreated({content, id: nextId}))}
            />
        </div>
    )
}

export default CommentSection