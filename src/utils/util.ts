import type { UserComment } from "../App"

export const editComment = (arr: any[], action: {
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

export const findReplyById = (comment: UserComment, id: number) =>
  comment.replies.find((reply: {
    id: number
  }) => reply.id === id)

// This recursive definition assumes that replies will always have a higher ID number since they're created after the parent comment. IDs are sequential.
// If the order in which comments/replies are created changes, a refactor is necessary and that includes factoring in the ID equation as well.

export const getLastId = (arr: {
  id: number
  replies: any[]
}[]): number =>
  Math.max.apply(null, arr.map(it =>
    it.replies?.length > 0 ? getLastId(it.replies) : it.id
  ))