import * as React from 'react'
import CommentsList from "./components/CommentsList"
import FormComponent from "./components/FormComponent"
import data from '../src/data.json'

export type UserComment = {
    id: number
    createdAt: string
    score: number
    content: string
    user: {
        username: string
        image: {
            png: string
            webp: string
        }
    }
    replies: UserReply[]
}

export type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

type ReducerActions = {
  type: string
  payload?: string
  id?: number
}

export const currentUser = data.currentUser

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

const dispatch: React.ActionDispatch<[action: ReducerActions]> = () => {}

// Make a recursive function that loops over the comments/arrays to find the one with the highest ID.

const getLastId = (comments: UserComment[]) =>
  Math.max.apply(null, [
    ...comments.map(it => it.id),
    ...comments.map(it => Math.max.apply(null, it.replies.map(it => it.id)))
  ])

function App() {
  const [comments, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_COMMENT':
        return [...state, {
          id: getLastId(state) + 1,
          score: 0,
          content: action.payload,
          replies: [],
          createdAt: 'now',
          user: currentUser
        }]

      case 'ADD_REPLY':
        const findReplyById = (comment: UserComment) =>
          comment.replies.find(reply => reply.id === action.id)

        const parentComment = state.find(comment => findReplyById(comment))
        const targetUser = parentComment ? findReplyById(parentComment)?.user : state.find(it => it.id === action.id)?.user

        const targetId = parentComment?.id || action.id

        const createReply = (user: UserComment['user']) => ({
          id: getLastId(state) + 1,
          score: 0,
          user: currentUser,
          replyingTo: user.username,
          createdAt: 'now',
          content: action.payload
        })

        return state.map(comment => {
          if (targetUser && comment.id === targetId)
            return {
              ...comment,
              replies: [...comment.replies, createReply(targetUser)]
            }

          return comment
        })

      case 'EDIT':
        console.log('The edit functionality goes here.')
        return state
        
      default:
        return state
    }
  }, data.comments)

  return (
    <div className="App">
      <CommentStateContext.Provider value={{
        comments,
        dispatch
      }}>
        <CommentsList />

        <FormComponent dispatchHandler={(content: string) => dispatch({
          type: 'ADD_COMMENT',
          payload: content
        })} />
      </CommentStateContext.Provider>
    </div>
  )
}

export const CommentStateContext = React.createContext({
  comments: data.comments,
  dispatch
})

export default App