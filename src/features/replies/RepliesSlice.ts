import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserComment } from "../comments/CommentsSlice";
import data from '../../data.json'

export type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

type ReplyID = UserReply['id']

type CreateReplyAction = {
    id: ReplyID
    content: string
    user: string
    parentCommentId: number
}

type EditReplyAction = {
    id: ReplyID
    content: string
}

type DeleteReplyAction = {
    id: ReplyID
    parentCommentId: number
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
        replyCreated(state, action: PayloadAction<CreateReplyAction>) {
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
        replyEdited(state, action: PayloadAction<EditReplyAction>) {
            const reply = state.byId[action.payload.id]
            reply.content = action.payload.content
        },
        replyDeleted(state, action: PayloadAction<DeleteReplyAction>) {
            delete state.byId[action.payload.id]
            state.allId = state.allId.filter(id => action.payload.id !== id)
        }
    }
})

export const { replyCreated, replyEdited, replyDeleted } = RepliesSlice.actions

export default RepliesSlice.reducer