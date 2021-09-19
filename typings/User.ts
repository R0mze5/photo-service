import { Post } from './Post';
import { RoomId } from './Room';

export type UserId = string;

export interface User {
  id: UserId
  avatar?: string
  userName: string
  email: string
  firstName?: string
  lastName?: string
  bio?: string
  posts: Array<Post>
  likes: Array<any>
  comments: Array<any>
  following: Array<User>
  followers: Array<User>
  rooms: Array<RoomId>
  loginSecret: string
}
