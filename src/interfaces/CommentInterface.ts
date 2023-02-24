import { UserInterface } from "./UserInterface";

export interface CommentInterface {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: UserInterface,
    replies: Array<any>
    replyingTo?: string
}