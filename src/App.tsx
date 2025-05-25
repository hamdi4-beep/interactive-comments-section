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
  payload?: any
  id?: number
}]> = () => {}

// Make a recursive function that loops over the comments/arrays to find the one with the highest ID.

const findGreatestId = (arr: any[]) => {
  return Math.max.apply(null, [
    ...arr.map(it => it.id),
    ...arr.map(it => Math.max.apply(null, it.replies.map((it: UserReply) => it.id)))
  ])
}

function App() {
  const [comments, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_COMMENT': {
        console.log(findGreatestId(state))
        return state
      }

      case 'ADD_REPLY': {
        console.log(state.find(it => it.id == action.id))
        return state
      }

      case 'REPLY_TO_REPLY': {
        for (const comment of state) {
          const reply = comment.replies.find(it => it.id === action.id)
          if (reply) console.log(reply)
        }

        return state
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