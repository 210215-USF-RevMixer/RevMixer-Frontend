import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { Sample } from 'src/app/Models/Sample';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-sample',
  templateUrl: './upload-sample.component.html',
  styleUrls: ['./upload-sample.component.scss']
})
export class UploadSampleComponent implements OnInit {
  authUser: any;
  //NEED TO ADD: NO ENDPOINT AVAILABLE YET IN README
  url: string = "NEED ENPOINT FOR AZUREUPLOAD CONTROLLER";
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  name: any;
  user: any;
  uploadedSample: any;
  sampleName: string = '';
  isPrivate: string = '0';



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
    this.uploadedSample =
    {
      id: 0,
      userId: 0,
      sampleName: '',
      sampleLink: '',
      
      tracks: []
    }

  }

  ngOnInit(): void {
  }





  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('songName', this.sampleName);
    formData.append('isPrivate', this.isPrivate);
    //console.log(fileToUpload.type.substring(0,5));
    if(fileToUpload.type.substring(0,5) != 'audio')
    {
      //console.log('not a video or audio file!!!!');
      this.message = 'You tried to upload something other than a song! Please try again';
    }
    else if(this.sampleName == '')
    {
      this.message = 'Please enter in a name for your track!';
    }
    else {
    //https://revmixerapi.azurewebsites.net/api/AzureBlob
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
        this.name = event.body; 
        this.uploadedSample.musicFilePath = this.name.name;
        this.uploadedSample.userId = this.user.id;
        this.uploadedSample.name = this.name.songname;
        //console.log(JSON.stringify(this.uploadedSample));

        this.uploadmusicService.PostSong(this.uploadedSample).subscribe(
          (response) =>
          {
            
            //console.log(response.musicFilePath);
          }
        )


        }
        
      }

    }
    )
  }
  }

  changePrivacy(event: any){
    console.log(event);
  }

}
