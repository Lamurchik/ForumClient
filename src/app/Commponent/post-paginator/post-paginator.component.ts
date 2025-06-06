import { Component, Input, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { Post } from '../../model/post.model';
import { GraphQLPage } from '../../model/page.model';
import {PostFeedComponent} from '../post-feed/post-feed.component'
import { DatePipe } from "@angular/common";
import {GraphQLService} from '../..//services/grapql.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-paginator',
  templateUrl: './post-paginator.component.html',
  styleUrls: ['./post-paginator.component.css'],
  imports : [PostFeedComponent, CommonModule],
  standalone: true
})
export class PostPaginatorComponent implements OnInit, OnChanges {
  posts: Post[] = [];
  currentStartCursor?: string;
  currentEndCursor?: string;
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;
  totalCount: number = 0;
  loading: boolean = false;
  pageSize: number = 10;
  str : string = "хуй";

  constructor(private graphQLService: GraphQLService, private cdr: ChangeDetectorRef) {
    console.log("коструктор");
    console.log('Данные которые передаём коструктор', this.posts); // теперь будет корректно
   }
   ngOnChanges() {
       
    console.log(`OnChanges Paginator`);
  }

    ngOnInit(): void {
    this.loading = true;
    this.loadPosts().then(() => {
      this.loading = false;
      console.log('Данные которые переданы в ngOnInit после загрузки:', this.posts);
    });
  }

  //first: ${after ? this.pageSize : "null"}
  private async loadPosts(before?: string, after?: string): Promise<void> {
    this.loading = true;
    const query =  `
      query  {
        postsPaging(
          first: ${this.pageSize }
          after: ${after ? `"${after}"` : "null"}
          last: ${before ? this.pageSize : "null"}
          before: ${before ? `"${before}"` : "null"}
          order: { dateCreate: ASC }
          where: { userAuthorId: { eq: ${this.graphQLService.getUserId()} } }
        ) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          nodes {
            title
            id
            getImage
            user {
              nickName
            }
            tags {
              id
              name
            }
          }
        }
      }
    ` ; 
    //console.log(query);
    try {
      const response = await this.graphQLService.RequestString<any>({ query }).toPromise();
      console.log('Полный ответ сервера:', response);

      if (response?.data?.postsPaging) {
        const data = response.data.postsPaging;
        this.posts = [...data.nodes];
        this.totalCount = data.totalCount;
        this.currentStartCursor = data.pageInfo.startCursor;
        this.currentEndCursor = data.pageInfo.endCursor;
        this.hasNextPage = data.pageInfo.hasNextPage;
        this.hasPreviousPage = data.pageInfo.hasPreviousPage;
        console.log('Данные успешно обновлены:', this.posts);
      } else {
        console.warn('Некорректная структура ответа');
        this.posts = [];
      }
      this.cdr.markForCheck();
    }
     catch (error) {
      console.error('Ошибка при загрузке постов:', error);
      this.posts = [];
    }
     finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  
  }
  nextPage() {
    if (this.hasNextPage) {
      this.loadPosts(undefined, this.currentEndCursor);
    }
  }
  previousPage(): void {
    if (this.hasPreviousPage) {
      this.loadPosts(this.currentStartCursor, undefined);
    }
  }
}


