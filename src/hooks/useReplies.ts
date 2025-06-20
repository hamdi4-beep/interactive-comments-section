import React from "react";
import data from '../data.json'
import type { Comment } from "./useComments";

interface Replies {
    byId: {
        [x: string]: Omit<Comment, 'replies'> & {
            replyingTo: string
        }
    }
    allId: number[]
}

export function useReplies() {
    const [replies, dispatch] = React.useReducer((state: Replies, action) => {
        switch (action) {
            default:
                return state
        }
    }, data.replies)

    return {replies, dispatch}
}