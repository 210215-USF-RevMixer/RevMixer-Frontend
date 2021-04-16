import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { Sample } from 'src/app/Models/Sample';
import { User } from 'src/app/Models/User';
import { SampleService } from 'src/app/services/sample.service';
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
  url: string = environment.PROJECTSERVICE_SAMPLESBLOBUPLOAD;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  name: any;
  user: any;
  uploadedSample: any;
  sampleName: string = '';
  isPrivate: string = '0';



  constructor(private http: HttpClient, private authService: AuthService, private userService: UserRestService, private uploadSampleService: SampleService) { 
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
      sampleName: '',
      sampleLink: '',
      
      track: []
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
    //const proxyUrl = "https://cors.bridged.cc/"
    //https://localhost:44301/api/SampleBlob
    this.http.post(`${this.url}`, formData, {reportProgress: true, observe: 'events'})
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
        //debugger;
        //console.log(event.body);
        const formdataforSample = new FormData();
        this.name = event.body; 
        formdataforSample.append('userId', this.user.id);
        formdataforSample.append('sampleLink', this.name.name);
        formdataforSample.append('sampleName', this.sampleName);
        formdataforSample.append('isPrivate', this.isPrivate);
        formdataforSample.append('isApproved', "1");
        formdataforSample.append('isLocked', "0");

        // this.uploadedSample.Id = 0;
        // this.uploadedSample.userId = this.user.id;
        // this.uploadedSample.sampleLink = this.name.name;
        // this.uploadedSample.sampleName = this.sampleName;
        // this.uploadedSample.isPrivate = this.isPrivate;
        // this.uploadedSample.isApproved = true;
        // this.uploadedSample.isLocked = false;

        //console.log(JSON.stringify(this.uploadedSample));

        this.uploadSampleService.AddSample(formdataforSample).subscribe()
        


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
