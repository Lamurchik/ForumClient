import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Comment } from "../../model/comment.model";
@Component({
    selector: "app-comment",
    standalone: true,
    imports: [Comment],
    templateUrl: "./layout.html",
    styleUrls: ["./layout.css" ]
})
export class CommentComponent { 

}