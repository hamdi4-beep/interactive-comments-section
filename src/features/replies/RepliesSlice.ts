import { createSlice } from "@reduxjs/toolkit";
import type { Comment } from "../comments/CommentsSlice";
import data from '../../data.json'

export type Reply = Omit<Comment, 'replies'> & {
    replyingTo: string
}

type ReplyID = Reply['id']

export interface ReplyState {
    byId: Record<ReplyID, Reply>
    allId: ReplyID[]
}

export const initialRepliesState: ReplyState = data.replies

const RepliesSlice = createSlice({
    name: 'replies',
    initialState: initialRepliesState,
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
        }
    }
})

export const { replyCreated } = RepliesSlice.actions

export default RepliesSlice.reducer