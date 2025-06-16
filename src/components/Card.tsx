import * as React from 'react'
import data from '../data.json'

import FormComponent from "./FormComponent"
import { CommentStateContext } from './CommentSection'

import type { UserComment, UserReply } from '../types/UserComment'

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

const Card = React.memo((props: {
    item: UserComment | UserReply
    children: React.ReactNode
}) => {
    const [isReplying, setIsReplying] = React.useState(false)
    const [isEditting, setIsEditting] = React.useState(false)
    const [isHidden, setIsHidden] = React.useState(true)

    const {dispatch} = React.useContext(CommentStateContext)

    const isCurrentUser = data.currentUser.username == props.item.user.username

    return (
        <div className="container">
            <div className='card'>
                <div className="score-component">
                    <button onClick={() =>
                        dispatch({
                            type: 'UP_VOTE',
                            id: props.item.id
                        })
                    }>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-plus.svg" alt="" />
                        </div>
                    </button>

                    <span>{props.item.score}</span>

                    <button onClick={() => dispatch({
                        type: 'DOWN_VOTE',
                        id: props.item.id
                    })}>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-minus.svg" alt="" />
                        </div>
                    </button>
                </div>

                <div className="content">
                    <div className="profile-header">
                        <div className="user">
                            <div className="user-img">
                                <img src={'/interactive-comment-section' + props.item.user.image.png} alt="" />
                            </div>

                            <h3>{props.item.user.username}</h3>

                            {isCurrentUser && (
                                <span className='current-user'>you</span>
                            )}

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
                        dispatch({
                            type: 'ADD_REPLY',
                            id: props.item.id,
                            payload: content
                        })

                        setIsReplying(false)
                    }}
                />
            )}

            {isEditting && (
                <FormComponent
                    placeholderValue='Edit a comment...'
                    value={props.item.content}
                    dispatchHandler={(content: string) => {
                        dispatch({
                            type: 'EDIT',
                            id: props.item.id,
                            payload: content
                        })

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
                        <button className="confirm" onClick={() => dispatch({ type: 'DELETE', id: props.item.id })}>Yes, Confirm</button>
                    </div>
                </div>
            )}
        </div>
    )
})

export default Card