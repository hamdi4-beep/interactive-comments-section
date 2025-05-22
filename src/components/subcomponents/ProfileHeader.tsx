function ProfileHeader(props: {
    avatar: string
    username: string
    date: string
    children: React.ReactNode
}) {
    return (
        <div className="profile-header">
            <div className="user">
                <div className="user-img">
                    <img src={props.avatar} alt="" />
                </div>

                <h3>{props.username}</h3>
                <span className="comment-date">{props.date}</span>
            </div>

            <div className="actions">
                {props.children}
            </div>
        </div>
    )
}

export default ProfileHeader