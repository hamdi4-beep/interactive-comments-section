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