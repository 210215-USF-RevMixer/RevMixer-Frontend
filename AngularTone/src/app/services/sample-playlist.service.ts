import { environment } from 'src/environments/environment';
import { SamplePlaylist } from './../Models/SamplePlaylist';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SamplePlaylistService {
  //NEEDS TO BE ADDED
  url: string = environment.PROJECTSERVICE_SAMPLEPLAYLIST;
  //(for testing locally) url: string = 'https://localhost:44301/api/SamplePlaylist'
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Context-Type': 'application/json'
      }
    )
  }
  constructor(private http: HttpClient) { }
  //Return all sample playlists
  GetAllSamplePlaylists(): Observable<SamplePlaylist[]> {
    return this.http.get<SamplePlaylist[]>(this.url, this.httpOptions);
  }
//Get samplePlaylist by id
GetSamplePlaylistById(id: number): Observable<any> {
  return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
}
  //Add a music playlist
  AddSamplePlaylist(samplePlaylist2Add: SamplePlaylist): Observable<SamplePlaylist> {
    return this.http.post<SamplePlaylist>(`${this.url}`, samplePlaylist2Add, this.httpOptions);
  }
}
