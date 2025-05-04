import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {PostPreviewComponent} from "../post-preview/post-preview.component"
import { Post } from "../../model/post.model";

@Component({
    selector: "app-post-feed",
    standalone: true,
    imports : [PostPreviewComponent],
    templateUrl: './post-feed.component.html',
    styleUrl: './post-feed.component.css'

})

export class PostFeedComponent {
@Input() posts : Post[] = [{id : 5}, {id: 6}];
ngOnInit(): void {
    console.log("PostFeedComponent получил: ",this.posts); //undfind
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['posts']) {
      console.log('PostFeedComponent получил:', this.posts);
    }
}
}