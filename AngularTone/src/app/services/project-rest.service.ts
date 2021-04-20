import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectRestService {

  url: string = environment.PROJECTSERVICE_USERPROJECT;

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) { }

  GetUserProjects() : Observable<any[]>
  {
    return this.http.get<any>(`${this.url}`, this.httpOptions);
  }  
}