import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Sample } from 'src/app/Models/Sample';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-adminmusic',
  templateUrl: './adminmusic.component.html',
  styleUrls: ['./adminmusic.component.scss']
})
export class AdminmusicComponent implements OnInit {
  authUser: any;
  music2admin: UploadMusic[];
  //music: UploadMusic;
  // name: string;

  constructor(private authService: AuthService, private userService: UserRestService,
    private musicService: UploadedMusicRestService) {this.music2admin = 
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
          role: '',
  
          userProjects: [],
          sample: [],
          comments: [],
          uploadMusics: [],
          playlists: []
        },
        musicPlaylists: [],
        comments: []
      }]
      }

  ngOnInit(): void {

          this.musicService.GetUploadedSongs().subscribe
          (foundmusic =>
            {
              this.music2admin = foundmusic;
              console.log(this.music2admin)
            })
          
  }

  onSubmit(event: any): void{
    
  }

   deleteSong(id: number): void{
     this.musicService.DeleteSongById(id).subscribe(
       (sub) => {
         alert(`The selected song was deleted.`);
       }
     );
   }

}