import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  url : string = 'https://revmixerapi.azurewebsites.net/api/User'

  constructor(private http:HttpClient) { }



  GetAllUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.url, this.httpOptions);
  }

}
