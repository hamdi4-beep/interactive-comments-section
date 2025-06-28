import * as React from 'react'
import data from '../data.json'
import FormComponent from "./FormComponent"
import { useAppDispatch, useAppSelector, useNextId } from '../hooks'
import { replyCreated, type UserReply } from '../features/replies/RepliesSlice'
import type { UserComment } from '../features/comments/CommentsSlice'

const CurrentUserActions = (props: {
    handleEditClick: React.MouseEventHandler
    handleDeleteClick: React.MouseEventHandler
}) => (
    <div className="user-actions">
        <button onClick={props.handleEditClick}>
            <div className="icon-img">
                <img src='/interactive-comment-section/images/icon-edit.svg' alt="" />
            </div>
    
            Edit
        </button>

        <button onClick={props.handleDeleteClick}>
            <div className="icon-img">
                <img src='/interactive-comment-section/images/icon-delete.svg' alt="" />
            </div>
    
            Delete
        </button>
    </div>
)

const Card = React.memo(function Card(props: {
    item: UserComment | UserReply,
    handleDispatch: (content: string) => void
    children: React.ReactNode
}) {
    const users = useAppSelector(state => state.users)

    const [isReplying, setIsReplying] = React.useState(false)
    const [isEditting, setIsEditting] = React.useState(false)
    const [isHidden, setIsHidden] = React.useState(true)

    const isCurrentUser = data.currentUser == props.item.user

    const upVoteBtnRef = React.createRef<HTMLButtonElement>()
    const downVoteBtnRef = React.createRef<HTMLButtonElement>()

    return (
        <div className="container">
            <div className='card'>
                <div className="score-component">
                    <button ref={upVoteBtnRef} onClick={() => {
                        upVoteBtnRef.current?.setAttribute('disabled', 'true')
                        downVoteBtnRef.current?.removeAttribute('disabled')
                    }}>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-plus.svg" alt="" />
                        </div>
                    </button>

                    <span>{props.item.score}</span>

                    <button ref={downVoteBtnRef} onClick={() => {
                        downVoteBtnRef.current?.setAttribute('disabled', 'true')
                        upVoteBtnRef.current?.removeAttribute('disabled')
                    }}>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-minus.svg" alt="" />
                        </div>
                    </button>
                </div>

                <div className="content">
                    <div className="profile-header">
                        <div className="user">
                            <div className="user-img">
                                <img src={'/interactive-comment-section' + users.byUsername[props.item.user].image.png} alt="" />
                            </div>

                            <h3 className={isCurrentUser ? 'current-user' : ''}>{props.item.user}</h3>

                            <span className="comment-date">{props.item.createdAt}</span>
                        </div>

                        <div className="actions">
                            {isCurrentUser ? (
                                <CurrentUserActions
                                    handleEditClick={() => setIsEditting(prev => !prev)}
                                    handleDeleteClick={() => setIsHidden(false)}
                                />
                            ) : (
                                <button onClick={() => setIsReplying(prev => !prev)}>
                                    <div className="icon-img">
                                        <img src='/interactive-comment-section/images/icon-reply.svg' alt="" />
                                    </div>
                            
                                    Reply
                                </button>
                            )}
                        </div>
                    </div>

                    {props.children}
                </div>
            </div>

            {isReplying && (
                <FormComponent
                    placeholderValue='Add a reply...'
                    dispatchHandler={(content: string) => {
                        if (content) {
                            props.handleDispatch(content)
                            setIsReplying(false)
                        }
                    }}
                />
            )}

            {isEditting && (
                <FormComponent
                    placeholderValue='Edit a comment...'
                    value={props.item.content}
                    dispatchHandler={() => {
                        setIsEditting(false)
                    }}
                />
            )}

            {!isHidden && (
                <div className="modal-container">
                    <h3>Delete comment</h3>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    
                    <div className="buttons">
                        <button className="cancel" onClick={() => setIsHidden(true)}>No, Cancel</button>
                        <button className="confirm" onClick={() => {}}>Yes, Confirm</button>
                    </div>
                </div>
            )}
        </div>
    )
})

export default Card