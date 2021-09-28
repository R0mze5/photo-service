import { Post } from './Post';
import { Comment } from './Comment';
import { BaseInterface } from './Base';

export type UserId = string;

export interface User  extends BaseInterface{
  id: UserId
  avatar?: string | null
  userName: string
  email: string
  firstName?: string
  lastName?: string
  bio?: string
  posts: Array<Post>
  likes: Array<any>
  comments: Array<Comment>
  following: Array<User>
  followers: Array<User>
  rooms: Array<Comment>
  loginSecret: string
  isFollowing:boolean
}


export interface UserSearch {
  avatar?: string | null
  userName: string
  isFollowing:boolean
}

