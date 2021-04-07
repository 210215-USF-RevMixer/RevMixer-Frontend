import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class ToneRESTService {

  httpOptions ={
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  url: string = 'url placeholder';

  constructor(private http:HttpClient) {}

  getAllUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.url, this.httpOptions)
  }
}
