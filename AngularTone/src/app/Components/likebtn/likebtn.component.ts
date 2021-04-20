import { Component, OnInit } from '@angular/core';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { HubRestService } from 'src/app/services/hub-rest.service';

@Component({
  selector: 'app-likebtn',
  templateUrl: './likebtn.component.html',
  styleUrls: ['./likebtn.component.scss']
})
export class LikebtnComponent implements OnInit {
  like: UploadMusic;
  constructor(private hubService: HubRestService) { 
  
    this.like =
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
        role: '',
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      isPrivate:false,
      musicPlaylists: [],
      comments: [],
      uploadDate: new Date
    }
}

ngOnInit(): void {
  this.hubService.GetAllUpload().subscribe
  (
    foundUser =>
    {
      this.like = foundUser;
    }
  )
}

AddLike(likes: UploadMusic)
{
  this.like.likes++;
  this.hubService.AddLike(this.like)
  console.log('button pressed');
}

}
