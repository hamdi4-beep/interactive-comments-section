import { useComments } from "../hooks/useComments";
import CommentsList from "./CommentsList";
import FormComponent from "./FormComponent";

function CommentSection() {
    const {comments} = useComments()
    console.log(comments)

    return (
        <div className="comment-section">
            <CommentsList />

            <FormComponent
                placeholderValue='Add a comment...'
                dispatchHandler={() => {}}
            />
        </div>
    )
}

export default CommentSection