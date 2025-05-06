import { Component, Input, InputSignal, OnChanges, SimpleChanges, input } from "@angular/core";
import {PostPreviewComponent} from "../post-preview/post-preview.component"
import { Post } from "../../model/post.model";
import { CommonModule } from '@angular/common';
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-post-feed",
    standalone: true,
    imports : [PostPreviewComponent, CommonModule],
    templateUrl: './post-feed.component.html',
    styleUrl: './post-feed.component.css'

})

export class PostFeedComponent {
@Input("posts") posts : Post[] = [{id: 1}]; //

data : InputSignal<string> = input();
ngOnInit(): void {
    console.log("PostFeedComponent получил: ",this.posts); //undfind
    console.log("data= ",  this.data());
  }
  post: Post ={
    id: 37,
    title: 'Мой первый постАААА',
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
    tags: [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'GraphQL' }
    ],
    titleImage: 'image123.jpg',
    getImage: 'https://russkiiyazyk.ru/wp-content/uploads/2018/06/Kartinka.jpg'
  };

  ngOnChanges() {    
    console.log(`OnChanges PostFeedComponent`);
    console.log("posts ",  this.posts);
  }
  
}
