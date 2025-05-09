function FormComponent() {
    return (
        <div className="form-component">
            <div className="current-user">
                <div className="user-avatar">
                    <img src="/images/avatars/image-juliusomo.png" alt="" />
                </div>
            </div>

            <form action="#">
                <textarea name="comment" id="comment" placeholder="Add a comment..."></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default FormComponent