import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserComment } from "../comments/CommentsSlice";
import data from '../../data.json'

export type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

type ReplyID = UserReply['id']

type CreateReplyPayload = {
    id: ReplyID
    content: string
    user: string
    parentCommentId: number
}

type EditReplyPayload = {
    id: ReplyID
    content: string
}

type DeleteReplyPayload = {
    id: ReplyID
    parentCommentId: number
}

type VoteReplyPayload = {
    id: ReplyID
    score: number
}

export interface ReplyState {
    byId: Record<ReplyID, UserReply>
    allId: ReplyID[]
}

export const initialState: ReplyState = data.replies

const RepliesSlice = createSlice({
    name: 'replies',
    initialState,
    reducers: {
        replyCreated(state, action: PayloadAction<CreateReplyPayload>) {
            state.byId[action.payload.id] = {
                id: action.payload.id,
                createdAt: 'now',
                user: data.currentUser,
                score: 0,
                content: action.payload.content,
                replyingTo: action.payload.user
            }

            state.allId.push(action.payload.id)
        },
        replyEdited(state, action: PayloadAction<EditReplyPayload>) {
            const reply = state.byId[action.payload.id]
            reply.content = action.payload.content
        },
        replyDeleted(state, action: PayloadAction<DeleteReplyPayload>) {
            delete state.byId[action.payload.id]
            state.allId = state.allId.filter(id => action.payload.id !== id)
        },
        replyScoreUpdated(state, action: PayloadAction<VoteReplyPayload>) {
            const reply = state.byId[action.payload.id]
            reply.score = action.payload.score
        }
    }
})

export const { replyCreated, replyEdited, replyDeleted, replyScoreUpdated } = RepliesSlice.actions

export default RepliesSlice.reducer