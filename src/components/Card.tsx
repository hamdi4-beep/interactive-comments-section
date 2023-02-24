import { getData } from '../service/getData'
import * as React from 'react'

import { CommentInterface } from "../interfaces/CommentInterface"

type CommentProp = {
    comment: CommentInterface
}

export function Card({ comment }: CommentProp) {
    const [currentUser, setCurrentUser] = React.useState({
        image: {
            png: '',
            webp: ''
        },

        username: ''
    })

    React.useEffect(() => {
        (async () => {
            const currentUser = await getData('http://localhost:3000/currentUser')
            setCurrentUser(currentUser)
        })()
    }, [])

    const { user } = comment
    const { image } = user

    return (
        <div className={comment.replyingTo ? 'flex reply-wrapper' : 'flex'}>
            <div className="score-wrapper">
                <button>
                    <img src="./images/icon-plus.svg" alt="" />
                </button>

                <span className='score'>{comment.score}</span>

                <button>
                    <img src="./images/icon-minus.svg" alt="" />
                </button>
            </div>

            <div className="content">
                <div className="user">
                    <div className="user-img">
                        <img src={image.png} alt="" />
                    </div>

                    {currentUser.username === user.username ? (
                        <span className='username'>{currentUser.username}
                            <span className='label'> you</span>
                        </span>
                    ) : (<span className='username'>{user.username}</span>)}

                    <span className='created_at'>{comment.createdAt}</span>

                    <button className='reply-btn'>
                        <img src="./images/icon-reply.svg" alt="reply icon" />
                        Reply
                    </button>
                </div>

                {comment.replyingTo ? (
                    <p>
                        <span className="replyingTo">@{comment.replyingTo} </span>
                        {comment.content}
                    </p>
                ) : (
                    <p>{comment.content}</p>
                )}
            </div>
        </div>
    )
}