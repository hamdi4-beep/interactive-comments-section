function ReplyButton(props: {
    toggleReply: React.MouseEventHandler
}) {
    return (
        <button onClick={props.toggleReply}>
            <div className="icon-img">
                <img src="/images/icon-reply.svg" alt="" />
            </div>
    
            Reply
        </button>
    )
}

export default ReplyButton