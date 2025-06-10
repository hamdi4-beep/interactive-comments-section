import * as React from 'react'

import ProfileHeader from "./subcomponents/ProfileHeader"
import FormComponent from "./FormComponent"
import ScoreComponent from "./subcomponents/ScoreComponent"
import { CommentStateContext, currentUser } from "../App"

import type { UserComment, UserReply } from '../App'

const CurrentUserActions = (props: {
    handleEditClick: React.MouseEventHandler
    handleDeleteClick: React.MouseEventHandler
}) => (
    <>
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
    </>
)

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
                <ScoreComponent score={props.item.score} />

                <div className="content">
                    <ProfileHeader {...{
                        avatar: props.item.user.image.png,
                        username: props.item.user.username,
                        date: props.item.createdAt
                    }}>
                        {!isCurrentUser && (
                            <button onClick={() => setIsReplying(prev => !prev)}>
                                <div className="icon-img">
                                    <img src='/interactive-comment-section/images/icon-reply.svg' alt="" />
                                </div>
                        
                                Reply
                            </button>
                        )}

                        {isCurrentUser && (
                            <CurrentUserActions
                                handleEditClick={() => setIsEditting(prev => !prev)}
                                handleDeleteClick={() => dispatch({ type: 'DELETE', id: props.item.id })}
                            />
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