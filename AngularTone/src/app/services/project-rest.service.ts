import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectRestService {

  url: string = environment.PROJECTSERVICE_USERPROJECT;

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) { }

  GetUserProjects() : Observable<any[]>
  {
    return this.http.get<any>(`${this.url}`, this.httpOptions);
  }

  GetUserProjectsByUserID(userid: number) : Observable<any[]>
  {
    return this.http.get<any>(`${this.url}/userId/${userid}`, this.httpOptions);
  }

  GetUserProjectByID(projectid: number) : Observable<any>
  {
    return this.http.get<any>(`${this.url}/${projectid}`, this.httpOptions);
  }

  DeleteUserProjectByID(projectid: number) : Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${projectid}`, this.httpOptions);
  }

  EditUserProject(project: any) : Observable<any>
  {
    return this.http.put<any>(`${this.url}/${project.id}`, project, this.httpOptions);
  }
}