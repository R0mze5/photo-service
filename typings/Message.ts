import { Room } from './Room';
import { User } from './User';

export type MessageId = string

export interface Message {
  id: MessageId
  text: string
  sender: User
  recipient: User
  room: Room
}
