import { createSlice } from "@reduxjs/toolkit";
import data from '../../data.json'
import { initialRepliesState } from "../replies/RepliesSlice";

export type Comment = {
    id: number
    createdAt: string
    score: number
    content: string
    user: string
    replies: number[]
}

export interface CommentState {
    byId: {
        [x: string]: Comment
    }
    allId: number[]
}

const initialCommentsState: CommentState = data.comments

const CommentsSlice = createSlice({
    name: 'comments',
    initialState: initialCommentsState,
    reducers: {
        createComment(state, action) {
            const nextId = Math.max.apply(null, [...initialCommentsState.allId, ...initialRepliesState.allId]) + 1

            state.byId[nextId] = {
                id: nextId,
                createdAt: 'now',
                score: 0,
                content: action.payload,
                // this works just fine when the information about the current user is stored in a local file, but needs to be updated if it's retreived from a remote resource.
                user: data.currentUser,
                replies: []
            }

            state.allId.push(nextId)
        }
    }
})

export const {createComment} = CommentsSlice.actions

export default CommentsSlice.reducer