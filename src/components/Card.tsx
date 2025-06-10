import * as React from 'react'

import FormComponent from "./FormComponent"
import { CommentStateContext, currentUser } from "../App"

import type { UserComment, UserReply } from '../App'

const CurrentUserActions = (props: {
    handleEditClick: React.MouseEventHandler
    handleDeleteClick: React.MouseEventHandler
}) => (
    <div className="current-user">
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

const ProfileHeader = (props: {
    avatar: string
    username: string
    date: string,
    children: React.ReactNode
}) => {
    const isCurrentUser = currentUser.username === props.username

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

function Card(props: {
    item: UserComment | UserReply
    children: React.ReactNode
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const [isEditting, setIsEditting] = React.useState(false)
    const {dispatch} = React.useContext(CommentStateContext)

    const isCurrentUser = currentUser.username == props.item.user.username

    return (
        <div className="container">
            <div className="card">
                <div className="score-component">
                    <button>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-plus.svg" alt="" />
                        </div>
                    </button>

                    <span>{props.item.score}</span>

                    <button>
                        <div className="icon-img">
                            <img src="/interactive-comment-section/images/icon-minus.svg" alt="" />
                        </div>
                    </button>
                </div>

                <div className="content">
                    <ProfileHeader {...{
                        avatar: props.item.user.image.png,
                        username: props.item.user.username,
                        date: props.item.createdAt
                    }}>
                        {isCurrentUser ? (
                            <CurrentUserActions
                                handleEditClick={() => setIsEditting(prev => !prev)}
                                handleDeleteClick={() => dispatch({ type: 'DELETE', id: props.item.id })}
                            />
                        ) : (
                            <button onClick={() => setIsReplying(prev => !prev)}>
                                <div className="icon-img">
                                    <img src='/interactive-comment-section/images/icon-reply.svg' alt="" />
                                </div>
                        
                                Reply
                            </button>
                        )}
                    </ProfileHeader>

                    {props.children}
                </div>
            </div>

            {isReplying && <FormComponent dispatchHandler={(content: string) => {
                dispatch({
                    type: 'ADD_REPLY',
                    id: props.item.id,
                    payload: content
                })

                setIsReplying(false)
            }} />}

            {isEditting && <FormComponent defaultValue={props.item.content} dispatchHandler={(content: string) => {
                dispatch({
                    type: 'EDIT',
                    id: props.item.id,
                    payload: content
                })

                setIsEditting(false)
            }} />}
        </div>
    )
}

export default Card