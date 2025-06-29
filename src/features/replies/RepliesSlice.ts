import { createSlice } from "@reduxjs/toolkit";
import type { UserComment } from "../comments/CommentsSlice";
import data from '../../data.json'

export type UserReply = Omit<UserComment, 'replies'> & {
    replyingTo: string
}

type ReplyID = UserReply['id']

export interface ReplyState {
    byId: Record<ReplyID, UserReply>
    allId: ReplyID[]
}

export const initialState: ReplyState = data.replies

const RepliesSlice = createSlice({
    name: 'replies',
    initialState,
    reducers: {
        replyCreated(state, action) {
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
        replyEdited(state, action) {
            const reply = state.byId[action.payload.id]
            reply.content = action.payload.content
        }
    }
})

export const { replyCreated, replyEdited } = RepliesSlice.actions

export default RepliesSlice.reducer