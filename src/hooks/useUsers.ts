import React from "react";
import data from '../data.json'

interface Users {
    byUsername: {
        [x: string]: {
            image: {
                png: string
                webp: string
            }
            username: string
        }
    }
    allUsername: string[]
}

export function useUsers() {
    const [users, dispatch] = React.useReducer((state: Users, action) => {
        switch (action) {
            default:
                return state
        }
    }, data.users)

    return {users, dispatch}
}