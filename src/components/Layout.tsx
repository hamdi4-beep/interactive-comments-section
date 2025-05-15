function Layout(props: {
    avatar: string
    username: string
    date: string
    children: React.ReactNode
}) {
    return (
        <div className="layout">
            <div className="header">
                <div className="user-img">
                    <img src={props.avatar} alt="" />
                </div>

                <h3>{props.username}</h3>
                <span className="date">{props.date}</span>

                <div className="controls">
                    <button>
                        <div className="icon-img">
                            <img src="/images/icon-reply.svg" alt="" />
                        </div>

                        Reply
                    </button>
                </div>
            </div>

            {props.children}
        </div>
    )
}

export default Layout