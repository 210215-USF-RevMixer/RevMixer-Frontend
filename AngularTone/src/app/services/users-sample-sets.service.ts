import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersSampleSetsService {

  url : string = environment.PROJECTSERVICE_USERSSAMPLESETS;
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
    return this.http.get<any[]>(`${this.url}/User/${userID}`, this.httpOptions);
  }
  //Add sampleset
  AddUsersSampleSet(sampleset2add: any): Observable<any> {
    return this.http.post<any>(this.url, sampleset2add, this.httpOptions);
  }

  DeleteSampleSet(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
  }
}
