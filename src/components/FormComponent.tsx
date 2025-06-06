import data from '../data.json'

function FormComponent(props: {
    defaultValue?: string
    dispatchHandler: Function
}) {
    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault()
        
        const formElement = e.target as HTMLFormElement
        const formData = new FormData(formElement)

        props.dispatchHandler(formData.get('comment') as string)

        formElement.reset()
    }

    return (
        <div className="form-component">
            <div className="current-user">
                <div className="user-img">
                    <img src={'/interactive-comment-section' + data.currentUser.image.png} alt="" />
                </div>
            </div>

            <form action="#" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" defaultValue={props.defaultValue} placeholder="Add a comment..."></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default FormComponent