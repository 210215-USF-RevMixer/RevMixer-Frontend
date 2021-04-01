import { HttpClient, HttpEventType, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Console } from 'node:console';
import { Http2ServerResponse } from 'node:http2';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  authUser: any;
  url: string = environment.AZURE_REST;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  name: any;
  user: any;
  uploadedSong: any;

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserRestService, private uploadmusicService: UploadedMusicRestService) {
    this.progress = 0,
    this.message = '',

    
    this.user = 
    {
      userName: '',
      id: 0,
      email: '',
      isAdmin: false,
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    },


    this.uploadedSong =
    {
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      uploadDate: new Date,
      likes: 0,
      plays: 0,
      musicPlaylists: [],
      comments: []
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      au =>
      this.authUser = au
    )
    this.authService.user$.subscribe(
      authUser =>

    this.userService.GetUserByEmail(authUser.email).subscribe
    (
      foundUser =>
      {
        //this.user = foundUser;
        this.updateUser(foundUser);
      }
    )
    )
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    //https://revmixerapi.azurewebsites.net/api/AzureBlob
    this.http.post("https://revmixerapi.azurewebsites.net/api/AzureBlob", formData, {reportProgress: true, observe: 'events'})
    .subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress){
        if(event.total){
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      }
      else if (event.type == HttpEventType.Response) {
        this.message = 'Upload success.';
        if(event.body)
        {
        this.onUploadFinished.emit(event.body);
        
        console.log(event.body);
        this.name = event.body; 
        this.uploadedSong.musicFilePath = this.name.name;
        this.uploadedSong.userId = this.user.id;
        this.uploadedSong.name = this.name.songname;
        //console.log(JSON.stringify(this.uploadedSong));

        this.uploadmusicService.PostSong(this.uploadedSong).subscribe(
          (response) =>
          {
            
            console.log(response.musicFilePath);
          }
        )


        }
        
      }

    }
    )

  }

  updateUser(foundUser: User): void {
    this.user = foundUser;
  }



}