import { User } from './User';

export type PostId = string

export interface Post {
  id: PostId
  files: Array<any>
  location?: string
  caption: string
  user: User
  likes: Array<any>
  comments: Array<any>
}
