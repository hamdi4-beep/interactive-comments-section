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
  id: number
}]> = () => {}

function App() {
  const [comments, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'delete':
        console.log(action.id)
        return state
        
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
        <FormComponent />
      </Context.Provider>
    </div>
  )
}

export const Context = React.createContext({
  comments: data.comments,
  dispatch
})

export default App