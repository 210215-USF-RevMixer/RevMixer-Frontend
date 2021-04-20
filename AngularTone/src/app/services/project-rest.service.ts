import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SavedProject } from '../Models/SavedProject';
import { UserProject } from '../Models/UserProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectRestService {

  url: string = environment.PROJECTSERVICE_SAVEDPROJECT;
  userProject: UserProject;

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http:HttpClient) {
    this.userProject = {
      id: 0,
      userId: 0,
      projectId: 0,
      owner: true,
      
      user: {
        id: 0,
        userName: '',
        email: 'coolguy@something.com',
        role: '',
        
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      savedProject: {
        id: 0,
        projectName: 'epic project',
        BPM: 140,
        userProjects: [],
        tracks: [{
          id: 0,
          projectId: 0,
          sampleId: 0,
          patternId: 0,
      
          savedProject: {
            id: 0,
            projectName: '',
            BPM: 0,
            userProjects: [],
            tracks: []
          },
          sample: {
            id: 0,
            sampleName: '',
            sampleLink: '',
            isPrivate:false,
            isApproved:false,
            isLocked:false,
            tracks: []
          },
          pattern: {
            id: 0,
            patternData: '0100011100010101010100101010101',
            track: []
          }
        }]
      }
    }
  }


  GetUserProjectsByUserID(userid: number) : Observable<any[]>
  {
    return this.http.get<any>(`${this.url}/userId/${userid}`, this.httpOptions);
  }

  GetUserProjectByID(projectid: number) : Observable<any>
  {
    return this.http.get<any>(`${this.url}/${projectid}`, this.httpOptions);
  }

  AddSavedProject(savedProject2add :FormData): Observable<any> {
    return this.http.post<any>(this.url, savedProject2add);
  }

  DeleteUserProjectByID(projectid: number) : Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${projectid}`, this.httpOptions);
  }

  EditUserProject(project: any) : Observable<any>
  {
    return this.http.put<any>(`${this.url}/${project.id}`, project, this.httpOptions);
  }

  //this method simulates what sort of format we might get back for a specified project from our
  //getprojectbyid function
  LoadProjectTest() : UserProject
  {
    //in the real world, we would need to retrun a more populated object than this
    return this.userProject;
  }
  
}
