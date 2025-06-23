import { configureStore } from "@reduxjs/toolkit";
import CommentsSlice from './features/comments/CommentsSlice'
import RepliesSlice from './features/replies/RepliesSlice'

export const store = configureStore({
    reducer: {
        comments: CommentsSlice,
        replies: RepliesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch