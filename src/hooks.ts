
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useNextId = () => {
    const allCommentIds = useAppSelector(state => state.comments.allId)
    const allReplyIds = useAppSelector(state => state.replies.allId)

    return Math.max.apply(null, [...allCommentIds, ...allReplyIds]) + 1
}