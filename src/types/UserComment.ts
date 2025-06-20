export interface Comments {
  byId: {
    [x: string]: {
        id: number
        createdAt: string
        score: number
        content: string
        user: string
        replies: number[]
    }
  }
  allId: number[]
}