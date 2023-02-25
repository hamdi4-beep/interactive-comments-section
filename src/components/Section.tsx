import { getData } from '../service/getData'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'

import Comment from './Comment'
import Reply from './Reply'

import { CommentInterface } from '../interfaces/CommentInterface'

const queryClient = new QueryClient()

export default function Section() {
    const queryComments = useQuery('comments', () => getData('http://localhost:3000/comments'))
    const queryCurrentUser = useQuery('currentUser', () => getData('http://localhost:3000/currentUser'))
  
    const isReady = queryComments.status === 'success' && queryComments.data.length > 0

    if (queryCurrentUser.error) console.log('Could not fetch current user!')
    if (queryComments.error) console.log('Could not fetch comments!')

    return (
        <div className='comments-section'>
            {isReady && queryComments.data.map((comment: CommentInterface, i: number) => {
                return (
                    <QueryClientProvider client={queryClient} key={i}>
                        <Comment comment={comment} />
                    </QueryClientProvider>
                )
            })}

            {queryCurrentUser.status === 'success' && (
                <Reply user={queryCurrentUser.data} />
            )}
        </div>
    )
}