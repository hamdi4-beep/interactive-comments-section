import * as React from 'react'
import { UserContext } from '../context/UserContext'
import { CommentInterface } from "../interfaces/CommentInterface"

import Reply from './Reply'
import { Card } from "./Card"
import { getData } from '../service/getData'
import { useQuery } from 'react-query'

type CommentProp = {
    comment: CommentInterface
}

export default function Comment({ comment }: CommentProp) {
    const [isReplying, setIsReplying] = React.useState(false)

    const { isLoading, data, error } = useQuery('currentUser', () => {
        return getData('http://localhost:3000/currentUser')
    })

    const { replies, user } = comment

    if (isLoading) return (<p>Loading...</p>)
    if (error) return (<p>Error occured!</p>)

    return (
        <div className="comment">
            <React.Fragment>
                <Card comment={comment}>{() => setIsReplying(!isReplying)}</Card>
                {isReplying && (<Reply receiver={user} />)}
            </React.Fragment>
            
            {replies.length > 0 && replies.map((reply: CommentInterface, i: number) => {
                return (
                    <UserContext.Provider value={data} key={i}>
                        <Card comment={reply} />
                    </UserContext.Provider>
                )
            })}
        </div>
    )
}