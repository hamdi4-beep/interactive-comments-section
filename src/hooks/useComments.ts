import * as React from 'react'
import type { ReducerActions } from "../types/ReducerActions"
import data from '../data.json'
import type { Comments } from "../types/UserComment"

export function useComments() {
  const [comments, dispatch] = React.useReducer<Comments, [action: ReducerActions]>((state: Comments, action: ReducerActions) => {
    switch (action.type) {
      default:
        return state
    }
  }, data.comments)

  return {comments, dispatch}
}