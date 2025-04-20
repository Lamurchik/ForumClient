import { Post } from './post.model';
import { User } from './user.model';
import { Comment } from './comment.model';

export enum NotificationType {
  AnswerComment,
  PostComment,
  GradeScore,
  Subscribe
}

export class SocialNotification {
  id?: number;
  title?: string;
  message?: string;
  postId?: number;
  userId?: number;
  commentId?: number;
  isRead?: boolean;
  post?: Post;
  user?: User;
  comment?: Comment;
  notificationType?: NotificationType;
  date?: string;
  time?: string;
}
