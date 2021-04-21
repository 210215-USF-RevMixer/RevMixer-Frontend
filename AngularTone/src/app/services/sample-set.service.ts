import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class SampleSetService {
  sample909set: string[] = [];


  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  url: string = environment.PROJECTSERVICE_SAMPLESETS;
  // url : string = "https://localhost:44301/api/SampleSets";

  constructor(private http:HttpClient) { }
  
  GetAllSampleSets():Observable<any>{
    return this.http.get<any[]>(this.url,this.httpOptions)
  }
  //Get sampleset by id
  GetSampleSet(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }
  //Get samplesets by userID
  GetUserSampleSets(userID: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/${userID}`, this.httpOptions);
  }
  //Add sampleset
  AddSampleSet(sampleset2add :FormData): Observable<any> {
    return this.http.post<any>(`${this.url}`, sampleset2add);
  }
  EditSampleSet(id: number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, this.httpOptions);
  }

  DeleteSampleSet(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
  }

  //Get preset sampleset for testing
  Get909Set(): string[]{
    this.sample909set.push('../../assets/909/Kick.wav');
    this.sample909set.push('../../assets/909/Snare.wav');
    this.sample909set.push('../../assets/909/HiHat.wav');
    return this.sample909set;
  };
}
