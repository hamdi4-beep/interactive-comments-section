import data from '../../data.json'

function ProfileHeader(props: {
    avatar: string
    username: string
    date: string,
    children: React.ReactNode
}) {
    const isCurrentUser = data.currentUser.username === props.username

    return (
        <div className="profile-header">
            <div className="user">
                <div className="user-img">
                    <img src={'/interactive-comment-section' + props.avatar} alt="" />
                </div>

                <h3>{props.username}</h3>

                {isCurrentUser && (
                    <span className='current-user'>you</span>
                )}

                <span className="comment-date">{props.date}</span>
            </div>

            <div className="actions">
                {props.children}
            </div>
        </div>
    )
}

export default ProfileHeader