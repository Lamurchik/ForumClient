import { Component, Input } from "@angular/core";
import { Post } from "../../../model/post.model";

@Component({
    selector: "app-post",
    standalone: true,
    templateUrl: './post-preview.component.html',
    styleUrl: './post-preview.component.css'

})

export class PostPreviewComponent{
 @Input() postId : number =1;
 post: Post ={
    id: 1,
    title: 'Мой первый пост',
    dateCreate: '2025-04-20',
    timeCreate: '12:30',
    userAuthorId: 42,
    user: {
      id: 42,
      nickName: 'VladDev',
      email: 'vlad@example.com',
      roleId: 2,
      role: {
        id: 2,
        roleName: 'User'
      }
    },
    body: 'Это содержимое моего поста...',
    tags: [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'GraphQL' }
    ],
    titleImage: 'image123.jpg',
    getImage: 'https://russkiiyazyk.ru/wp-content/uploads/2018/06/Kartinka.jpg'
  };
}