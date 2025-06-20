import * as React from 'react'
import data from '../data.json'

export interface Comments {
  byId: {
    [x: string]: Comment
  }
  allId: number[]
}

export type Comment = {
    id: number
    createdAt: string
    score: number
    content: string
    user: string
    replies: number[]
}

export function useComments() {
  const [comments, dispatch] = React.useReducer((state: Comments, action) => {
    switch (action.type) {
      default:
        return state
    }
  }, data.comments)

  return {comments, dispatch}
}