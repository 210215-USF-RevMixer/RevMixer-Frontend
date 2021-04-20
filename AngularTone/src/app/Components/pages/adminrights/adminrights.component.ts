import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Sample } from 'src/app/Models/Sample';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { SampleService } from 'src/app/services/sample.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-adminrights',
  templateUrl: './adminrights.component.html',
  styleUrls: ['./adminrights.component.scss']
})
export class AdminrightsComponent implements OnInit {
  authUser: any;
  user: User;
  samples2admin: Sample[];
  music2admin: UploadMusic[];
  constructor(private authService: AuthService, private userService: UserRestService,
    private musicService: UploadedMusicRestService, private sampleService: SampleService) {
      this.music2admin = 
    [{
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      uploadDate: new Date,
      likes: 0,
      plays: 0,
      isPrivate: false,
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
      comments: []
    }],
      this.samples2admin = 
      [{
        id: 0,
        sampleName: '',
        sampleLink: '',
        isPrivate: false,
        isApproved: false,
        isLocked: false,
        tracks: []
      }]
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
      }
    }

  ngOnInit(): void {
          this.sampleService.GetSamples().subscribe
          (foundsamples =>
            {
              this.samples2admin = foundsamples;
              console.log(this.samples2admin)
            })
          }

  onSubmit(): void{
    
}

deleteSample(id: number): void{
  this.sampleService.DeleteSampleByID(id).subscribe(
    (sub) => {
      alert(`The selected sample was deleted.`);
    }
  );
}

}
