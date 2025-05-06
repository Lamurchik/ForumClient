import { Component, Input, OnInit } from '@angular/core';
import { PostPaginatorComponent } from '../../post-paginator/post-paginator.component';
import {PaginatorComponent} from '..//..//paginator/paginator.component'
import {GraphQLService} from '../..//..//services/grapql.service'
import { firstValueFrom } from 'rxjs';
import { Post } from '../../../model/post.model';
import { GraphQLPage } from '../../../model/page.model';
@Component({
    selector: 'app-post-paginator',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    imports : [PostPaginatorComponent, PaginatorComponent],
    standalone: true
  })
export class ProfileComponent{ 
  str : string = "ProfileComponent input";
}