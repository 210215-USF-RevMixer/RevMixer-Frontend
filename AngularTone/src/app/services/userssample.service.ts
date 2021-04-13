import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersSample } from '../Models/UsersSample';

@Injectable({
  providedIn: 'root'
})
export class UserssampleService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }
  url : string = environment.SAVED_PROJECTS_REST;
  constructor(private http:HttpClient) { 
  }

  //UserSamples will primarily be added when a user selects a sample to add to their library from the public samples list
  //in the sample hub component
  AddUserSample(usersSample:UsersSample): Observable<any> {
    return this.http.post<any>(this.url, usersSample, this.httpOptions);
  }
}
