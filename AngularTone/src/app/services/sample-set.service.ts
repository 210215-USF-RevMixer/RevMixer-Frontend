import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  url : string = '';

  constructor(private http:HttpClient) { }
  //Add sampleset
  AddSampleSet(sampleset2add: any): Observable<any> {
    return this.http.post<any>(this.url, sampleset2add, this.httpOptions);
  }
  GetAllSampleSets():Observable<any>{
    return this.http.get<any[]>(this.url,this.httpOptions)
  }
  //Get sampleset by id
  GetSampleSet(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }
  //Get samplesets by userID
  GetUserSampleSets(userID: number){
    return this.http.get<any[]>(`${this.url}/${userID}`, this.httpOptions);
  }

  //Get preset sampleset for testing
  Get909Set(): string[]{
    this.sample909set.push('../../assets/909/Kick.wav');
    this.sample909set.push('../../assets/909/Snare.wav');
    this.sample909set.push('../../assets/909/HiHat.wav');
    return this.sample909set;
  };
}
