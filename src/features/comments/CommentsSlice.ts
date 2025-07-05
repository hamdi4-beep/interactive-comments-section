import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import data from '../../data.json'
import { replyCreated, replyDeleted } from "../replies/RepliesSlice";

export type UserComment = {
    id: string
    createdAt: string
    score: number
    content: string
    user: string
    replies: UserComment['id'][]
}

type CommentID = UserComment['id']

export interface CommentState {
    byId: Record<CommentID, UserComment>
    allId: CommentID[]
}

interface CreateCommentPayload {
    commentId: CommentID
    content: UserComment['content']
}

interface EditCommentPayload extends CreateCommentPayload {}

interface DeleteCommentPayload {
    commentId: CommentID
}

interface UpdateCommentScorePayload {
    commentId: CommentID
    score: UserComment['score']
}

const initialState: CommentState = data.comments

const findCommentId = (state: CommentState, targetId: CommentID) =>
    state.allId.find(id => targetId === id)

const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentCreated: {
            reducer: (state, action: PayloadAction<CreateCommentPayload>) => {
                state.byId[action.payload.commentId] = {
                    id: action.payload.commentId,
                    createdAt: 'now',
                    score: 0,
                    content: action.payload.content,
                    // this works just fine when the information about the current user is stored in a local file, but needs to be updated if it's retrieved from a remote resource.
                    user: data.currentUser,
                    replies: []
                }

                state.allId.push(action.payload.commentId)
            },
            prepare: (content: string) => {
                return {
                    payload: {
                        content,
                        commentId: nanoid()
                    }
                }
            }
        },
        commentEdited(state, action: PayloadAction<EditCommentPayload>) {
            const comment = state.byId[action.payload.commentId]
            comment.content = action.payload.content
        },
        commentDeleted(state, action: PayloadAction<DeleteCommentPayload>) {
            delete state.byId[action.payload.commentId]
            state.allId = state.allId.filter(id => action.payload.commentId !== id)
        },
        commentScoreUpdated(state, action: PayloadAction<UpdateCommentScorePayload>) {
            const comment = state.byId[action.payload.commentId]
            comment.score = action.payload.score
        }
    },
    extraReducers: builder =>
        builder
            .addCase(replyCreated, (state, action) => {
                const commentID = findCommentId(state, action.payload.parentCommentId)
                
                if (commentID)
                    state.byId[commentID].replies.push(action.payload.replyId)
            })
            .addCase(replyDeleted, (state, action) => {
                const commentID = findCommentId(state, action.payload.parentCommentId)

                if (commentID)
                    state.byId[commentID].replies = state.byId[commentID].replies.filter(replyId => replyId !== action.payload.replyId)
            })
})

export const {commentCreated, commentEdited, commentDeleted, commentScoreUpdated} = CommentsSlice.actions

export default CommentsSlice.reducer