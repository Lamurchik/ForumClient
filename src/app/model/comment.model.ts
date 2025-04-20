import { Post } from './post.model';
import { User } from './user.model';
import { Grade } from './grade.model';

export class Comment {
  id?: number;
  body?: string;
  image?: string;
  parentCommentId?: number;
  userId?: number;
  postId?: number;
  grades?: Grade[];
  user?: User;
  post?: Post;
  commentDate?: string;
  commentTime?: string;
  getImage?: string;
}
