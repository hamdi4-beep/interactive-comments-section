import * as React from 'react'
import data from '../data.json'

function FormComponent(props: {
    defaultValue?: string
    placeholderValue: string
    dispatchHandler: Function
}) {
    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault()
        
        const formElement = e.target as HTMLFormElement
        const formData = new FormData(formElement)

        props.dispatchHandler(formData.get('comment') as string)

        formElement.reset()
    }

    React.useEffect(() => {
        const textAreaElement = textAreaRef.current
        textAreaElement?.focus()
    }, [])

    return (
        <div className="form-component">
            <div className="current-user">
                <div className="user-img">
                    <img src={'/interactive-comment-section' + data.currentUser.image.png} alt="" />
                </div>
            </div>

            <form action="#" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" defaultValue={props.defaultValue} placeholder={props.placeholderValue} ref={textAreaRef}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default FormComponent