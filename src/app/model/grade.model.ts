import { Post } from './post.model';
import { Comment } from './comment.model';
import { User } from './user.model';

export class Grade {
  id?: number;
  postId?: number;
  commentId?: number;
  userId?: number;
  post?: Post;
  comment?: Comment;
  user?: User;
  isLike?: boolean;
  gradeDate?: string;
  gradeTime?: string;
}
