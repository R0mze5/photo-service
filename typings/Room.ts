import { User } from './User';

export type RoomId = string

export interface Room {
  id: RoomId
  participants: Array<User>
}
