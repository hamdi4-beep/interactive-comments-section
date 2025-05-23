import * as React from 'react'
import CommentsList from "./components/CommentsList"
import FormComponent from "./components/FormComponent"
import data from '../src/data.json'

type UserComment = {
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

type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

const dispatch: React.ActionDispatch<[action: {
  type: string
  payload: any
}]> = () => {}

function App() {
  const [comments, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_COMMENT': {
        const findGreatestInteger = (list: number[]) => Math.max.apply(null, list)

        return [...state, {
          id: findGreatestInteger([...state.map(it => it.id), ...state.map(it => findGreatestInteger(it.replies.map(it => it.id)))]) + 1,
          content: action.payload,
          score: 0,
          user: data.currentUser,
          replies: [],
          createdAt: 'now'
        }]
      }
        
      default:
        return state
    }
  }, data.comments)

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