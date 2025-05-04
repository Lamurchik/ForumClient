import { Component, Input } from "@angular/core";
import { Post } from "../../model/post.model";
import {Router} from "@angular/router";
@Component({
    selector: "app-post-preview",
    standalone: true,
    templateUrl: './post-preview.component.html',
    styleUrl: './post-preview.component.css'

})

export class PostPreviewComponent{
  body: string = `
  <p>Музыкант из Нью-Джерси Крис Далла Рива,
   работающий над аналитикой и персонализацией в стриминговом сервисе Audiomack,&nbsp;
   <a href="https://www.cantgetmuchhigher.com/p/i-analyzed-chord-progressions-in" rel="
   `


 @Input() post: Post ={
    id: 37,
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
    body: this.body,
    tags: [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'GraphQL' }
    ],
    titleImage: 'image123.jpg',
    getImage: 'https://russkiiyazyk.ru/wp-content/uploads/2018/06/Kartinka.jpg'
  };
//../../../assets/image/Kartinka.jpg

  constructor(private router: Router){}


  onReadPost() : void{
    this.router.navigate(["post", this.post.id]);
  }

  getLikeCount(): number {
    return this.post?.grades?.filter(g => g.isLike).length ?? 0;
  }
  
  getDislikeCount(): number {
    return this.post?.grades?.filter(g => !g.isLike).length ?? 0;
  }

  getFirstParagraph(): string {
    if (!this.post.body) return '';
    const paragraphs = this.post.body.split(/<\/?p[^>]*>/gi);
    const firstValid = paragraphs.find(p => 
      p.trim().replace(/&nbsp;|\s+/g, '').length > 0
    );
    return firstValid?.trim() || 'Нет контента';
  }
  


}