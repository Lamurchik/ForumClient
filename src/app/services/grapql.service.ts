import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class GraphQLService{

   readonly hostName : string = "https://localhost:7143/graphql";
    constructor(private http : HttpClient){}

    private get token(): string | null {
      return localStorage.getItem('token');
    }
  
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    getUserId(): number | null {
      const userIdStr = localStorage.getItem('userId');
      return userIdStr ? +userIdStr : null;
    }
  
    setUserId(userId: number) {
      localStorage.setItem('userId', userId.toString());
    }
  
    clearAuthData() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  
    RequestString<T>(body: { query }): Observable<T> {
      let headersConfig: any = {
        'Content-Type': 'application/json'
      };
  
      if (this.token) {
        headersConfig['Authorization'] = `Bearer ${this.token}`;
      }
  
      const headers = new HttpHeaders(headersConfig);
      return this.http.post<T>(this.hostName, body, { headers });
    }

    RequestMultipart<T>(operations: any, map: any, file: File): Observable<T> {
      const formData = new FormData();
    
      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify(map));
      formData.append('0', file, file.name);
    
      const headers = new HttpHeaders({
        'GraphQL-Preflight': '1', // 🔧 Обязательный заголовок
        Authorization: `Bearer ${this.token ?? ''}`
      });
    
      return this.http.post<T>(this.hostName, formData, { headers });
    }
    
}