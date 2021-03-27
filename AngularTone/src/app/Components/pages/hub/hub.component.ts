import { Component, OnInit } from '@angular/core';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { HubRestService } from 'src/app/services/hub-rest.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  // upload: UploadMusic [];
  upload: UploadMusic ;
  constructor(private hubService: HubRestService) { 
  //   this.upload = [
  //     {
  //       ID: 0,
  //       userId: 0,
  //       musicFilePath: '',
  //       name: '',
  //       likes: 0,
  //       plays: 0,
  //       user:
  //       {
  //         ID: 0,
  //         userName: '',
  //         email: '',
  //         isAdmin: false,
  //         userProjects: [],
  //         sample: [],
  //         comments: [],
  //         uploadMusics: [],
  //         playlists: []
  //       },
  //       musicPlaylists: [],
  //       comments: [],
  //       uploadDate: new Date
  //     }
  // ],
  this.upload =
    {
      ID: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
      user:
      {
        ID: 0,
        userName: '',
        email: '',
        isAdmin: false,
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      musicPlaylists: [],
      comments: [],
      uploadDate: new Date
    }
}
    


  ngOnInit(): void {
    this.hubService.GetUpload(1).subscribe
    (
      foundUser =>
      {
        this.upload = foundUser;
      }
    )
  }
  
  AddLike(likes: UploadMusic)
  {
    this.upload.likes++;
    this.hubService.AddLike(this.upload)
    console.log('button pressed');
  }

  // convertToSingleSong(song: UploadMusic[]){
  //   // this.upload[] = this.upload2;
  //   this.AddLike(this.upload2);
  // }
  
}
