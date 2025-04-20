import { Component } from "@angular/core";
import {GraphQLService} from "src/app/services/grapql.service"
import { DatePipe } from "@angular/common";
import { CommonModule } from '@angular/common';
import {PostPreviewComponent} from "src/app/Commponent/post-preview/post-preview.component"
import {PostFeedComponent} from  "../../post-feed/post-feed.component"


@Component({
    selector: "home-app",
    imports: [CommonModule, PostPreviewComponent, PostFeedComponent],
    standalone: true,
    templateUrl: "./home.component.html" 
})
export class HomeComponent {
    answer : any;

     constructor(private QLService: GraphQLService ){}

     query = {
        query: `
          query {
            users {
              email
              id
              nickName
              roleId
            }
          }
        `
      };
     ngOnInit(){

        this.QLService.RequestString<any>(this.query).subscribe(res => {
            this.answer = res;
          });
     }
 }           