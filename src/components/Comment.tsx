import FormComponent from "./FormComponent"
import ProfileHeader from "./subcomponents/ProfileHeader"
import Button from "./subcomponents/Button"
import Reply from "./Reply"
import * as React from 'react'
import ScoreComponent from "./subcomponents/ScoreComponent"
import { Context, currentUser } from "../App"

import type { UserComment } from "../App"

export const createProps = (info: {
    user: {
        image: {
            png: string
        }
        username: string
    }
    createdAt: string
}) => ({
    avatar: info.user.image.png,
    username: info.user.username,
    date: info.createdAt
})

export const CurrentUserActions = (props: {
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

function Comment(props: {
    comment: UserComment
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const {dispatch} = React.useContext(Context)

    const isCurrentUser = currentUser.username == props.comment.user.username

    return (
        <div className="comment-wrapper">
            <div className="card">
                <ScoreComponent score={props.comment.score} />

                <div className="content">
                    <ProfileHeader {...createProps(props.comment)}>
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

                    <p>{props.comment.content}</p>
                </div>
            </div>

            {isReplying && <FormComponent dispatchHandler={(content: string) => dispatch({
                type: 'ADD_REPLY',
                id: props.comment.id,
                payload: content
            })} />}

            <div className="replies-list">
                {props.comment.replies.map(reply => (
                    <Reply
                        reply={reply}
                        key={reply.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comment