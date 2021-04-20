import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Tone from 'tone';
import { SampleSetService } from './sample-set.service';

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

  uploadHttpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'multipart/form-data'
      }
    )
  }
  // url : string = 'https://localhost:44301/api/Sample';
  url : string = environment.PROJECTSERVICE_SAMPLE;

  constructor(private http:HttpClient) { }
  
  GetSamples(): Observable<any> {
    return this.http.get<any[]>(this.url, this.httpOptions);
  }
  GetSampleByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions);
  }

  GetSamplesByUserID(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${userId}`, this.httpOptions);
  }
  
  AddSample(sample: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}`, sample);
  }
  EditSampleByID(id: number): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, id);
  }
  DeleteSampleByID(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
  }
}