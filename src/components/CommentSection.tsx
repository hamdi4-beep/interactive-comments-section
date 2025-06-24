import { createComment } from "../features/comments/CommentsSlice";
import { useAppDispatch, useIds } from "../hooks";
import CommentsList from "./CommentsList";
import FormComponent from "./FormComponent";

function CommentSection() {
    const dispatch = useAppDispatch()

    return (
        <div className="comment-section">
            <CommentsList />

            <FormComponent
                placeholderValue='Add a comment...'
                dispatchHandler={(content: string) => dispatch(createComment(content))}
            />
        </div>
    )
}

export default CommentSection