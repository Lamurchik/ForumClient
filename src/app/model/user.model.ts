import { Role } from './role.model';
import { Post } from './post.model';
import { UserInfo } from './user-info.model';

export class User {
  id?: number;
  nickName?: string;
  email?: string;
  roleId?: number;
  role?: Role;
  posts?: Post[];
  userInfo?: UserInfo;
}
