import { getData } from '../service/getData'
import * as React from 'react'

import Comment from './Comment'
import Reply from './Reply'

import { CommentInterface } from '../interfaces/CommentInterface'

export default function Section() {
    const [comments, setComments] = React.useState([])

    const [currentUser, setCurrentUser] = React.useState({
        image: {
            png: '',
            webp: ''
        },

        username: ''
    })
    
    React.useEffect(() => {
        (async () => {
            const comments = await getData('http://localhost:3000/comments')
            const currentUser = await getData('http://localhost:3000/currentUser')

            setCurrentUser(currentUser)
            setComments(comments)
        })()
    }, [])
  
    return (
        <div className='comments-section'>
            {comments.length > 0 && comments.map((comment: CommentInterface, i: number) => {
                return (
                    <Comment comment={comment} key={i} />
                )
            })}

            {currentUser && (
                <Reply user={currentUser} />
            )}
        </div>
    )
}