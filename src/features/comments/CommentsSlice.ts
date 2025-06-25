import { createSlice } from "@reduxjs/toolkit";
import data from '../../data.json'
import { replyCreated } from "../replies/RepliesSlice";

export type Comment = {
    id: number
    createdAt: string
    score: number
    content: string
    user: string
    replies: number[]
}

type CommentID = Comment['id']

export interface CommentState {
    byId: Record<CommentID, Comment>
    allId: CommentID[]
}

const initialCommentsState: CommentState = data.comments

const CommentsSlice = createSlice({
    name: 'comments',
    initialState: initialCommentsState,
    reducers: {
        commentCreated(state, action) {
            state.byId[action.payload.id] = {
                id: action.payload.id,
                createdAt: 'now',
                score: 0,
                content: action.payload.content,
                // this works just fine when the information about the current user is stored in a local file, but needs to be updated if it's retreived from a remote resource.
                user: data.currentUser,
                replies: []
            }

            state.allId.push(action.payload.id)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(replyCreated, (state, action) => {
                state.byId[action.payload.parentCommentId].replies.push(action.payload.id)
            })
})

export const {commentCreated} = CommentsSlice.actions

export default CommentsSlice.reducer