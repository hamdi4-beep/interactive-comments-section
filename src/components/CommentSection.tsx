import * as React from 'react'

import CommentsList from "./CommentsList";
import FormComponent from "./FormComponent";

import data from '../data.json'

import { reducer } from '../reducers/reducer'

import type { UserComment } from '../types/UserComment'
import type { ReducerActions } from '../types/ReducerActions';

export const CommentStateContext = React.createContext<{
    dispatch: React.ActionDispatch<[action: ReducerActions]>,
    comments: UserComment[]
}>({
  dispatch() {},
  comments: data.comments
})

function CommentSection() {
    const [comments, dispatch] = React.useReducer<UserComment[], [action: ReducerActions]>(reducer, data.comments)

    return (
        <div className="comment-section">
            <CommentStateContext.Provider value={{comments, dispatch}}>
                <CommentsList />

                <FormComponent
                    placeholderValue='Add a comment...'
                    dispatchHandler={(content: string) => dispatch({
                        type: 'ADD_COMMENT',
                        payload: content
                    })}
                />
            </CommentStateContext.Provider>
        </div>
    )
}

export default CommentSection