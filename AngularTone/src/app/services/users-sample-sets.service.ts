import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersSampleSetsService {

  url : string = '';
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) { }
  
  GetAllUsersSampleSet():Observable<any>{
    return this.http.get<any[]>(this.url,this.httpOptions)
  }
  //Get sampleset by id
  GetUsersSampleSetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }
  //Get samplesets by userID
  ///api/UsersSampleSets/User/{userID}"
  GetUsersSampleSetByUserId(userID: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/UsersSampleSet/User/${userID}`, this.httpOptions);
  }
  //Add sampleset
  AddUsersSampleSet(sampleset2add: any): Observable<any> {
    return this.http.post<any>(this.url, sampleset2add, this.httpOptions);
  }
}
