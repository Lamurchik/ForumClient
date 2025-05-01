import { Component, Input } from "@angular/core";
import { Post } from "../../../model/post.model";
import { ActivatedRoute, Params } from "@angular/router";
import {GraphQLService} from "../../../services/grapql.service"
@Component({
    selector: "app-post",
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.css'
})

export class PostComponent{
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

  id : number | undefined;

  constructor(private route: ActivatedRoute, private QLService: GraphQLService ){         
    // отслеживаем изменение параметра id
    route.params.subscribe(params=>this.id=params["id"]);
  }

  ngOnInit(){
    const query = {
      query: `
        query{
  posts(where: { id: { eq: ${this.id} } }) {
    body
    getImage
    tags {
      id
      name
    }
    title
    user {
      nickName
    }
    userAuthorId
    dateCreate
  }
}
      `
    };
    this.QLService.RequestString<{ data: { posts: Post[] } }>(query)
    .subscribe(response => {
      if (response.data.posts.length > 0) {
        this.post = response.data.posts[0];
      } else {
        console.error("Пост не найден");
      }
    });
  }


  //сделать подсчёт на сервере 
  getLikeCount(): number {
    return this.post?.grades?.filter(g => g.isLike).length ?? 0;
  }
  
  getDislikeCount(): number {
    return this.post?.grades?.filter(g => !g.isLike).length ?? 0;
  }


}