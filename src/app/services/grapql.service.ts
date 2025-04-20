import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class GraphQLService{

   readonly hostName : string = "https://localhost:7143/graphql";
    constructor(private http : HttpClient){}

   // Respons<T>(body: string) : T {}
    
   RequestString<T>(body: { query: string }): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    return this.http.post<T>(this.hostName, body, { headers });
  }
    
}