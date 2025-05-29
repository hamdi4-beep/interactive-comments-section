import { createProps } from "./Comment"
import ProfileHeader from "./subcomponents/ProfileHeader"
import Button from "./subcomponents/Button"
import FormComponent from "./FormComponent"
import * as React from 'react'
import ScoreComponent from "./subcomponents/ScoreComponent"
import { Context, currentUser } from "../App"

import type { UserReply } from "../App"

function Reply({
    reply
}: {
    reply: UserReply
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const {dispatch} = React.useContext(Context)

    const isCurrentUser = currentUser.username == reply.user.username

    return (
        <div className="reply-wrapper">
            <div className="card">
                <ScoreComponent score={reply.score} />

                <div className="content">
                    <ProfileHeader {...createProps(reply)}>
                        <Button
                            clickHandler={e => setIsReplying(prev => !prev)}
                            iconImage="/images/icon-reply.svg"
                            label="Reply"
                        />

                        {isCurrentUser && (
                            <Button
                                clickHandler={e => {}}
                                iconImage="/images/icon-edit.svg"
                                label="Edit"
                            />
                        )}

                        {isCurrentUser && (
                            <Button
                                clickHandler={e => {}}
                                iconImage="/images/icon-delete.svg"
                                label="Delete"
                            />
                        )}
                    </ProfileHeader>

                    <p>
                        <span className="replying-to">@{reply.replyingTo} </span>
                        {reply.content}
                    </p>
                </div>
            </div>

            {isReplying && <FormComponent dispatchHandler={(content: string) => dispatch({
                type: 'REPLY_TO_REPLY',
                id: reply.id,
                payload: content
            })} />}
        </div>
    )
}

export default Reply