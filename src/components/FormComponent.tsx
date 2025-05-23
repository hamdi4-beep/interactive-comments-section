import data from '../data.json'

function FormComponent(props: {
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
                    <img src={data.currentUser.image.png} alt="" />
                </div>
            </div>

            <form action="#" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" placeholder="Add a comment..."></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default FormComponent