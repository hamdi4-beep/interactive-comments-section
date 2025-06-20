import CommentsList from "./CommentsList";
import FormComponent from "./FormComponent";

function CommentSection() {
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