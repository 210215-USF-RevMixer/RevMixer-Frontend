import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  //sample909set: string[] = [];


  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  url : string = environment.SAVED_PROJECTS_REST;

  constructor(private http:HttpClient) { }
  
  GetSamples(): Observable<any> {
    return this.http.get<any[]>(this.url, this.httpOptions);
  }
  GetSampleByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }
  
  AddSample(sample2add: any): Observable<any> {
    return this.http.post<any>(this.url, sample2add, this.httpOptions);
  }
}