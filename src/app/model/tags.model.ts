import { Category } from './category.model';
import { Post } from './post.model';

export class Tags {
  id?: number;
  name?: string;
  posts?: Post[];
  category?: Category;
}
