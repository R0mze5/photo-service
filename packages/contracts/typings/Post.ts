import { Comment } from './Comment';
import { User } from './User';
import { File } from './File';
import { BaseInterface } from './Base';

export type PostId = string

export interface Post extends BaseInterface {
  id: PostId
  files: Array<File>
  location?: string | null
  caption: string
  user: User
  likes: Array<any>
  comments: Array<Comment>
  isLiked: boolean
  likesCount: number
  createdAt: string
}

export interface PostCreate extends BaseInterface {
  files: Array<string>
  location?: string
  caption?: string
  user: User
}
