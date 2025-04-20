import { Component, Input } from "@angular/core";
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
@Input() posts : Post[] = [{id: 1}, {id: 2}, {id:3}];
}