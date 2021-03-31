import { Component, OnInit } from '@angular/core';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { HubRestService } from 'src/app/services/hub-rest.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  upload: UploadMusic[];
  constructor(private hubService: HubRestService) { 
  
    this.upload =[
    {
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
      user:
      {
        id: 0,
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
  ]
}
    


  ngOnInit(): void {
    this.hubService.GetAllUpload().subscribe
    (
      foundUser =>
      {
        this.upload = foundUser;
      }
    )
  }
  }
