import * as React from 'react'

import ProfileHeader from "./subcomponents/ProfileHeader"
import FormComponent from "./FormComponent"
import ScoreComponent from "./subcomponents/ScoreComponent"
import Button from "./subcomponents/Button"
import { CommentStateContext, currentUser, createProps } from "../App"
import data from '../data.json'

import type { UserComment, UserReply } from '../App'

const CurrentUserActions = (props: {
    handleEditClick: React.MouseEventHandler
    handleDeleteClick: React.MouseEventHandler
}) => (
    <>
        <Button
            label="Edit"
            iconImage="/images/icon-edit.svg"
            clickHandler={props.handleEditClick}
        />

        <Button
            label="Delete"
            iconImage="/images/icon-delete.svg"
            clickHandler={props.handleDeleteClick}
        />
    </>
)

const EditForm = (props: {
    value: string
}) => {
    return (
        <div className="form-component">
            <div className="current-user">
                <div className="user-img">
                    <img src={data.currentUser.image.png} alt="" />
                </div>
            </div>

            <form action="#" onSubmit={e => {}}>
                <textarea name="comment" id="comment" value={props.value} placeholder="Add a comment..."></textarea>
                <button>Send</button>
            </form>
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
                <ScoreComponent score={props.item.score} />

                <div className="content">
                    <ProfileHeader {...createProps(props.item)}>
                        {!isCurrentUser && (
                            <Button
                                clickHandler={e => setIsReplying(prev => !prev)}
                                iconImage="/images/icon-reply.svg"
                                label="Reply"
                            />
                        )}

                        {isCurrentUser && (
                            <CurrentUserActions
                                handleEditClick={e => setIsEditting(prev => !prev)}
                                handleDeleteClick={e => {}}
                            />
                        )}
                    </ProfileHeader>

                    {props.children}
                </div>
            </div>

            {isReplying && <FormComponent dispatchHandler={(content: string) => dispatch({
                type: 'ADD_REPLY',
                id: props.item.id,
                payload: content
            })} />}

            {isEditting && <EditForm value={props.item.content} />}
        </div>
    )
}

export default Card