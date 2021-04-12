import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadMusic } from '../Models/UploadMusic';

@Injectable({
  providedIn: 'root'
})
export class UploadedMusicRestService {

  responseValue: any;

  url: string = environment.UPLOAD_MUSIC_REST;


  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) { }

  GetUploadedSongs() : Observable<any>
  {
    return this.http.get<any>(`${this.url}`, this.httpOptions);
  }

  GetSongsByUserId(userid:number) : Observable<any>
  {
    return this.http.get<any>(`${this.url}/User/${userid}`, this.httpOptions);
  }

  EditSong(id: number): Observable<any>
  {
    return this.http.put<any>(`${this.url}/${id}`, this.httpOptions);
  }

  PostSong(song:any)
  {
    return this.http.post<UploadMusic>(`${this.url}`, song, this.httpOptions);
  }
}
