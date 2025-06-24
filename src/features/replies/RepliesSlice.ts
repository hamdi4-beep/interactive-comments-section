import { createSlice } from "@reduxjs/toolkit";
import type { Comment } from "../comments/CommentsSlice";
import data from '../../data.json'

export type Reply = Omit<Comment, 'replies'> & {
    replyingTo: string
}

export interface ReplyState {
    byId: {
        [x: string]: Reply
    }
    allId: number[]
}

export const initialRepliesState: ReplyState = data.replies

const RepliesSlice = createSlice({
    name: 'replies',
    initialState: initialRepliesState,
    reducers: {}
})

export default RepliesSlice.reducer