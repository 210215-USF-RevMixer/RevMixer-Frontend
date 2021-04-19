import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SavedProject } from '../Models/SavedProject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedProjectRestService {
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }
  //url
  url: string = environment.PROJECTSERVICE_SAVEDPROJECT;

  constructor(private http: HttpClient) { }

  //Logic 

  //Add a saved project
  AddSavedProject(savedProject2add :FormData): Observable<any> {
    return this.http.post<any>(`${this.url}`, savedProject2add);
  }

  GetProjects() : Observable<any[]>
  {
    return this.http.get<any>(`${this.url}`, this.httpOptions);
  }
}
