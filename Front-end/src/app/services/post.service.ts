import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Post } from "../models/Post";
import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:3000/posts";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient, 
    private errorHandlerService: ErrorHandlerService
    ){}

  findAll(): Observable<Post[]>{
    return this.http
    .get<Post[]>(this.url, { responseType: "json" })
    .pipe(
      catchError(this.errorHandlerService.handleError<Post[]>("findAll", []))
    );
  }

  createPost(formData: Partial<Post>, userId: Pick<User, "id">): Observable<Post>{
    return this.http
    .post<Post>(this.url, { 
      title: formData.title, 
      content: formData.content,
      user: userId 
    }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Post>("createPost"))
    );
  }

  deletePost(postId: Pick<Post, "id">): Observable<{}>{
    return this.http
    .delete<Post>(`${this.url}/${postId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Post>("deletePost"))
    )
  }

}
