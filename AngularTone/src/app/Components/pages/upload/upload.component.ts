import { HttpClient, HttpEventType, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
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
  //NEED TO ADD: NO ENDPOINT AVAILABLE YET IN README
  url: string = environment.PROJECTSERVICE_MUSICBLOBUPLOAD;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  name: any;
  user: any;
  uploadedSong: any;
  songName: string = '';
  isPrivate: Boolean = true;

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
      comments: [
        //might need to add a body to comments
      ],
      isPrivate: false,
      isApproved: true,
      isLocked: false
    }
  }

  ngOnInit(): void {
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
    formData.append('songName', this.songName);
    //formData.append('isPrivate', this.isPrivate);

    //console.log(fileToUpload.type.substring(0,5));
    if(fileToUpload.type.substring(0,5) != 'audio')
    {
      //console.log('not a video or audio file!!!!');
      this.message = 'You tried to upload something other than a song! Please try again';
    }
    else if(this.songName == '')
    {
      this.message = 'Please enter in a name for your track!';
    }
    else {
    //http://localhost:52824/api/UploadMusicBlob
    this.http.post(this.url, formData, {reportProgress: true, observe: 'events'})
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
        //console.log(event.body);
        //debugger;
        this.name = event.body; 
        this.uploadedSong.musicFilePath = this.name.name;
        this.uploadedSong.userId = this.user.id;
        this.uploadedSong.name = this.songName;
        this.uploadedSong.isPrivate = this.isPrivate;
        this.uploadedSong.isApproved = true;
        this.uploadedSong.isLocked = false;
        this.uploadedSong.musicPlaylists = [];
        this.uploadedSong.comments = [];
        this.uploadedSong.uploadDate = Date.now;
        console.log(JSON.stringify(this.uploadedSong));
        
        this.uploadmusicService.PostSong(this.uploadedSong).subscribe()
        }
        
      }

    }
    )
  }

  }

  changePrivacy(event: any){
    console.log(event);
  }
  updateUser(foundUser: User): void {
    this.user = foundUser;
  }



}
