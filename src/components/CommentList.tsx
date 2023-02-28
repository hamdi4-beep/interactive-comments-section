import { getData } from '../service/getData'
import { useQuery } from 'react-query'

import Comment from './Comment'

import { CommentInterface } from '../interfaces/CommentInterface'
import Reply from './Reply'

export default function CommentList() {
    const { status, data, error } = useQuery('comments', () => getData('http://localhost:3000/comments'))
  
    const isReady = status === 'success' && data.length > 0

    if (error) console.log('Could not fetch comments!')

    return (
        <div className='comments-section'>
            {isReady && data.map((comment: CommentInterface, i: number) => {
                return (
                    <Comment comment={comment} key={i} />
                )
            })}

            <Reply />
        </div>
    )
}