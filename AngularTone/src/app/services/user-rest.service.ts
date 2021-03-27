import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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


  url : string = environment.USERS_REST;

  constructor(private http:HttpClient) { }


  GetUser(userid:number ) : Observable<any>
  {
    return this.http.get<User>(`${this.url}/${userid}`, this.httpOptions)
  }

  GetUserByEmail(email:string) : Observable<any>
  {
    return this.http.get<User>(`${this.url}/email/${email}`, this.httpOptions)
  }
}
