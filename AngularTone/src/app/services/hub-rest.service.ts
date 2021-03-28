import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comments } from '../Models/Comments';
import { UploadMusic } from '../Models/UploadMusic';


@Injectable({
  providedIn: 'root'
})
export class HubRestService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  url : string = environment.UPLOAD_MUSIC_REST;

  constructor(private http:HttpClient) { }

  GetAllUpload() : Observable<any>
  {
    return this.http.get<UploadMusic>(this.url, this.httpOptions);
  }

  AddLike(upload: UploadMusic) : Observable<UploadMusic>
  {
    return this.http.put<any>(`${this.url}/${upload.likes}`, upload, this.httpOptions);
  }

  GetAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.url, this.httpOptions);
  }
}
