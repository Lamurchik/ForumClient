import { User } from './user.model';
import { Comment } from './comment.model';
import { Grade } from './grade.model';
import { Tags } from './tags.model';

export class Post {
  id?: number;
  title?: string;
  dateCreate?: string;
  timeCreate?: string;
  userAuthorId?: number;
  user?: User;
  body?: string;
  grades?: Grade[];
  comments?: Comment[];
  tags?: Tags[];
  titleImage?: string;
  getImage?: string;
}
