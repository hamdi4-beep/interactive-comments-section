import { createSlice } from "@reduxjs/toolkit";
import data from '../../data.json'

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

const initialState: CommentState = data.comments

const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {}
})

export default CommentsSlice.reducer