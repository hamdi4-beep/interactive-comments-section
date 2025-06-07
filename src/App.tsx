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

type AddCommentAction = {
  type: 'ADD_COMMENT'
  payload: string
}

type AddReplyAction = {
  type: 'ADD_REPLY'
  id: number
  payload: string
}

type EditAction = {
  type: 'EDIT'
  id: number
  payload: string
}

type DeleteAction = {
  type: 'DELETE'
  id: number
}

type ReducerActions =
  | AddCommentAction
  | AddReplyAction
  | EditAction
  | DeleteAction

export const currentUser = data.currentUser

const dispatch: React.ActionDispatch<[action: ReducerActions]> = () => {}

// This recursive definition assumes that replies will always have a higher ID number since they're created after the parent comment. IDs are sequential.
// If the order in which comments/replies are created changes, a refactor is necessary and that includes factoring in the ID equation as well.

const getLastId = (arr: {
  id: number
  replies: any[]
}[]): number =>
  Math.max.apply(null, arr.map(it =>
    it.replies?.length > 0 ? getLastId(it.replies) : it.id
  ))

const editComment = (arr: any[], action: {
      id: number
      payload: string
    }) =>
  arr.map(item => {
    if (item.id == action.id)
      return {
        ...item,
        content: action.payload
      }

    return item
  })

const findReplyById = (comment: UserComment, id: number) =>
  comment.replies.find(reply => reply.id === id)

function App() {
  const [comments, dispatch] = React.useReducer<UserComment[], [action: ReducerActions]>((state, action) => {
    switch (action.type) {
      case 'ADD_COMMENT': {
        return [...state, {
          id: getLastId(state) + 1,
          score: 0,
          content: action.payload,
          replies: [],
          createdAt: 'now',
          user: currentUser
        }]
      }

      case 'ADD_REPLY': {
        const parentComment = state.find(comment => findReplyById(comment, action.id))
        const targetId = parentComment?.id || action.id

        return state.map(comment => {
          const targetUser = parentComment ? findReplyById(parentComment, action.id)?.user : comment.user

          if (comment.id === targetId && targetUser)
            return {
              ...comment,
              replies: [...comment.replies, {
                id: getLastId(state) + 1,
                score: 0,
                user: currentUser,
                replyingTo: targetUser.username,
                createdAt: 'now',
                content: action.payload
              }]
            }

          return comment
        })
      }

      case 'EDIT': {
        const parentComment = state.find(comment => findReplyById(comment, action.id))

        if (parentComment) {
          return state.map(comment => {
            if (!(parentComment.id == comment.id)) return comment

            return {
                ...comment,
                replies: editComment(comment.replies, action)
              }
          })
        }

        return editComment(state, action)
      }

      case 'DELETE': {
        const parentComment = state.find(comment => findReplyById(comment, action.id))
        
        if (parentComment) {
          const reply = findReplyById(parentComment, action.id)

          return state.map(comment => {
            if (parentComment.id === comment.id)
              return {
                ...parentComment,
                replies: parentComment.replies.filter(it => reply?.id !== it.id)
              }

            return comment
          })
        }

        return state.filter(comment => comment.id !== action.id)
      }
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