import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { Post } from '../../model/post.model';
import { GraphQLPage } from '../../model/page.model';
import {PostFeedComponent} from '../post-feed/post-feed.component'
import {GraphQLService} from '../..//services/grapql.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-paginator',
  templateUrl: './post-paginator.component.html',
  styleUrls: ['./post-paginator.component.css'],
  imports : [PostFeedComponent, CommonModule],
  standalone: true
})
export class PostPaginatorComponent implements OnInit {
  posts: Post[] = [{id : 5}, {id: 6}];
  currentStartCursor?: string;
  currentEndCursor?: string;
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;
  totalCount: number = 0;
  loading: boolean = false;
  pageSize: number = 10;

  constructor(private graphQLService: GraphQLService, private cdr: ChangeDetectorRef) {
    console.log("коструктор");
    console.log('Данные которые передаём коструктор', this.posts); // теперь будет корректно
   }

    ngOnInit(): void {
    this.loadPosts().then(p=>console.log("дождались"));
    console.log('Данные которые перадаём в ngOnInit', this.posts); //выполняеться до- тут пусто
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
   
    console.log(query);
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
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
      this.posts = [];
    } finally {
      this.loading = false;
    }
  
    console.log('Данные которые передаём', this.posts); // теперь будет корректно
    this.cdr.detectChanges();
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

  get noPosts(): boolean {
    return !this.loading && this.posts.length === 0;
  }
  
}


