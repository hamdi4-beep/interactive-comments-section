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

export const currentUser = data.currentUser

const dispatch: React.ActionDispatch<[action: {
  type: string
  payload?: string
  id?: number
}]> = () => {}

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
          user: data.currentUser
        }]

      case 'ADD_REPLY':
        return state.map(it => {
          if (it.id === action.id) {
            return {
              ...it,
              replies: [...it.replies, {
                id: getLastId(state) + 1,
                score: 0,
                createdAt: 'now',
                user: data.currentUser,
                replyingTo: it.user.username,
                content: action.payload
              }]
            }
          }

          return it
        })

      case 'REPLY_TO_REPLY':
        const parentComment = state.find(it => it.replies.some(it => it.id === action.id))!
        const reply = parentComment.replies.find(it => it.id === action.id)!

        return state.map(it => {
          if (it.id === parentComment.id) {
            return {
              ...it,
              replies: [...it.replies, {
                id: getLastId(state) + 1,
                score: 0,
                createdAt: 'now',
                user: data.currentUser,
                replyingTo: reply.user.username,
                content: action.payload
              }]
            }
          }

          return it
        })
        
      default:
        return state
    }
  }, data.comments)

  console.log(getLastId(data.comments))

  return (
    <div className="App">
      <Context.Provider value={{
        comments,
        dispatch
      }}>
        <CommentsList />

        <FormComponent dispatchHandler={(content: string) => dispatch({
          type: 'ADD_COMMENT',
          payload: content
        })} />
      </Context.Provider>
    </div>
  )
}

export const Context = React.createContext({
  comments: data.comments,
  dispatch
})

export default App