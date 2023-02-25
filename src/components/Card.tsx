import * as React from 'react'

import { UserContext } from '../context/UserContext'
import { CommentInterface } from "../interfaces/CommentInterface"

type CommentProp = {
    comment: CommentInterface,
    children?: Function
}

type EventHandler = (e: React.SyntheticEvent) => void

export function Card({ comment, children }: CommentProp) {
    const [score, setScore] = React.useState(comment.score)
    const currentUser = React.useContext(UserContext)

    const { user } = comment
    const { image } = user

    const isCurrentUser = currentUser.username === user.username

    const handleClick: EventHandler = (e) => children && children()

    return (
        <div className={comment.replyingTo ? 'flex reply-wrapper' : 'flex'}>
            <div className="score-wrapper">
                <button onClick={(e: React.SyntheticEvent) => setScore(score + 1)}>
                    <img src="./images/icon-plus.svg" alt="" />
                </button>

                <span className='score'>{score}</span>

                <button onClick={(e: React.SyntheticEvent) => score > 0 && setScore(score - 1)}>
                    <img src="./images/icon-minus.svg" alt="" />
                </button>
            </div>

            <div className="content">
                <div className="user">
                    <div className="user-img">
                        <img src={image.png} alt="" />
                    </div>

                    {isCurrentUser ? (
                        <span className='username'>{currentUser.username}
                            <span className='label'>you</span>
                        </span>
                    ) : (<span className='username'>{user.username}</span>)}

                    <span className='created_at'>{comment.createdAt}</span>

                    {isCurrentUser ? (
                        <div className='btns'>
                            <button className='btn delete-btn'>
                                <img src='./images/icon-delete.svg' alt='delete icon' />
                                Delete
                            </button>

                            <button className='btn edit-btn'>
                                <img src='./images/icon-edit.svg' alt='edit icon' />
                                Edit
                            </button>
                        </div>
                    ) : (
                        <button className='btn reply-btn' onClick={handleClick}>
                            <img src="./images/icon-reply.svg" alt="reply icon" />
                            Reply
                        </button>
                    )}
                </div>

                {comment.replyingTo ? (
                    <p>
                        <span className="replyingTo">@{comment.replyingTo}</span>
                        {comment.content}
                    </p>
                ) : (
                    <p>{comment.content}</p>
                )}
            </div>
        </div>
    )
}