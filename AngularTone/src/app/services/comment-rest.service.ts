import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comments } from '../Models/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentRestService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  url : string = environment.COMMENT_REST;

  constructor(private http:HttpClient) { }

  GetAllComment() : Observable<any>
  {
    return this.http.get<Comments>(this.url, this.httpOptions)
  }
  GetAllComments(id: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.url}/${id}`, this.httpOptions);
  }
  SubmitComment(AddComment: Comments): Observable<Comments>{
    return this.http.post<Comments>(this.url, AddComment, this.httpOptions)
  }
}
