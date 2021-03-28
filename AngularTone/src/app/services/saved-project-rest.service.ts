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
  url: string = environment.SAVED_PROJECTS_REST;

  constructor(private http: HttpClient) { }

  //Logic

  //Add a saved project
  AddSavedProject(savedProject2Add: SavedProject): Observable<SavedProject> {
    return this.http.post<SavedProject>(this.url, savedProject2Add, this.httpOptions);
  }
}
