import type { UserComment } from "../types/UserComment"
import data from '../data.json'
import { findReplyById, editComment, getLastId } from "../utils/util"

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

type UpVoteAction = {
  type: 'UP_VOTE'
  id: number
}

type DownVoteAction = {
  type: 'DOWN_VOTE'
  id: number
}

export type ReducerActions =
  | AddCommentAction
  | AddReplyAction
  | EditAction
  | DeleteAction
  | UpVoteAction
  | DownVoteAction

export function reducer(state: UserComment[], action: ReducerActions) {
  switch (action.type) {
    case 'ADD_COMMENT': {
      return [...state, {
        id: getLastId(state) + 1,
        score: 0,
        content: action.payload,
        replies: [],
        createdAt: 'now',
        user: data.currentUser
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
              user: data.currentUser,
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

    case 'UP_VOTE': {
      const comment = state.find(it => action.id === it.id)

      if (comment)
        return state.map(it => {
          if (it.id === comment.id) {
            return {
              ...comment,
              score: comment.score + 1
            }
          }

          return it
        })

      return state
    }

    case 'DOWN_VOTE': {
      const comment = state.find(it => action.id === it.id)

      if (comment)
        return state.map(it => {
          if (it.id === comment.id) {
            return {
              ...comment,
              score: comment.score - 1
            }
          }

          return it
        })

      return state
    }
  }
}