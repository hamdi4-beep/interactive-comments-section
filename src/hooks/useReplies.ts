import React from "react";
import data from '../data.json'

interface Replies {
    byId: {
        [x: string]: {
            id: number
            createdAt: string
            score: number
            content: string
            user: string
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