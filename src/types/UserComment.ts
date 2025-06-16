export interface UserComment {
  id: number
  createdAt: string
  score: number
  content: string
  user: {
      username: string
      image: {
          png: string
          webp: string
      }
  }
  replies: UserReply[]
}

export interface UserReply extends Omit<UserComment, 'replies'> {
    replyingTo: string
}