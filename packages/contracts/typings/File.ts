import { BaseInterface } from "./Base";
import { Post } from "./Post";

export type FileId = string

export interface File extends BaseInterface {
  id: FileId
  url: string
  post: Post
}
