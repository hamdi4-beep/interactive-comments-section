function Comment({
    comment
}: any) {
    return (
        <div className="comment">
            <div className="score-wrapper">
                <button>
                    <div className="icon-wrapper">
                        <img src='/images/icon-plus.svg' alt="" />
                    </div>

                    <span>{comment.score}</span>

                    <div className="icon-wrapper">
                        <img src="/images/icon-ninus.svg" alt="" />
                    </div>
                </button>
            </div>

            <div className="content">
                <div className="user-wrapper">
                    <div className="user-img">
                        <img src={comment.user.image.png} alt="" />
                    </div>

                    <h3>{comment.user.username}</h3>
                    <span>{comment.createdAt}</span>

                    <div>
                        <button>
                            <div className="icon-wrapper">
                                <img src="/images/icon-reply.svg" alt="" />
                            </div>

                            Reply
                        </button>
                    </div>
                </div>

                <p>{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment