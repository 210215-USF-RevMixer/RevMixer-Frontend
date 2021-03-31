import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { PlayList } from '../Models/PlayList';

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Context-Type': 'application/json'
      }
    )
  }
  url: string = environment.PLAYLIST_REST;

  constructor(private http: HttpClient) { }

  //Return all playlists
  GetAllPlaylists(): Observable<PlayList[]> {
    return this.http.get<PlayList[]>(this.url, this.httpOptions);
  }
  //Add a playlist
  ;
  AddPlaylist(playList2Add: PlayList): Observable<PlayList> {
    debugger;
    return this.http.post<PlayList>(this.url, playList2Add, this.httpOptions);
  }
}
