import * as React from 'react'
import CommentsList from "./components/CommentsList"
import FormComponent from "./components/FormComponent"
import data from '../src/data.json'
import { reducer } from './reducers/reducer'
import type { ReducerActions } from './reducers/reducer'

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

const dispatch: React.ActionDispatch<[action: ReducerActions]> = () => {}

function App() {
  const [comments, dispatch] = React.useReducer<UserComment[], [action: ReducerActions]>(reducer, data.comments)

  return (
    <div className="App">
      <CommentStateContext.Provider value={{comments, dispatch}}>
        <CommentsList />

        <FormComponent
          placeholderValue='Add a comment...'
          dispatchHandler={(content: string) => dispatch({
            type: 'ADD_COMMENT',
            payload: content
          })}
        />
      </CommentStateContext.Provider>
    </div>
  )
}

export const CommentStateContext = React.createContext({
  comments: data.comments,
  dispatch
})

export default App