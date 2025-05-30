import * as React from 'react'

import ProfileHeader from "./subcomponents/ProfileHeader"
import FormComponent from "./FormComponent"
import ScoreComponent from "./subcomponents/ScoreComponent"
import Button from "./subcomponents/Button"
import { Context, currentUser, createProps } from "../App"

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

function Card(props: {
    item: UserComment | UserReply
    children: React.ReactNode
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const {dispatch} = React.useContext(Context)

    const isCurrentUser = currentUser.username == props.item.user.username

    return (
        <div className="container">
            <div className="card">
                <ScoreComponent score={props.item.score} />

                <div className="content">
                    <ProfileHeader {...createProps(props.item)}>
                        <Button
                            clickHandler={e => setIsReplying(prev => !prev)}
                            iconImage="/images/icon-reply.svg"
                            label="Reply"
                        />

                        {isCurrentUser && (
                            <CurrentUserActions
                                handleEditClick={e => console.log('The edit functionality.')}
                                handleDeleteClick={e => console.log('The delete functionality.')}
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
        </div>
    )
}

export default Card