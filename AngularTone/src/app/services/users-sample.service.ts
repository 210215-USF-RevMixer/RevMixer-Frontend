import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersSampleService {

  url : string = environment.PROJECTSERVICE_USERSSAMPLE;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) { }
  
  GetAllUsersSample():Observable<any>{
    return this.http.get<any[]>(this.url,this.httpOptions)
  }
  //Get sampleset by id
  GetUsersSampleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }
  //Get samplesets by userID
  ///api/UsersSample/User/{userID}
  GetUsersSampleByUserId(userID: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/UsersSample/User/${userID}`, this.httpOptions);
  }
  //Add sampleset
  AddUsersSample(sampleset2add: any): Observable<any> {
    return this.http.post<any>(this.url, sampleset2add, this.httpOptions);
  }


}
