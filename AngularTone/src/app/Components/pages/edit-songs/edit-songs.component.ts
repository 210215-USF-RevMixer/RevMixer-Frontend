import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-edit-songs',
  templateUrl: './edit-songs.component.html',
  styleUrls: ['./edit-songs.component.scss']
})
export class EditSongsComponent implements OnInit {

  music2edits: UploadMusic[];
  user: User;
  authUser: any;
  constructor(private router: Router, private musicService: UploadedMusicRestService,
    private authService: AuthService, private userService: UserRestService) {
    this.music2edits = 
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
    }],
    this.user = 
    {
      userName: '',
      id: 0,
      email: '',
      role: '',
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    }
    }

    ngOnInit(): void {
      this.authService.user$.subscribe(
        au =>
        this.authUser = au
      )
      this.authService.user$.subscribe(
        authUser =>
        this.userService.GetUserByEmail(authUser!.email!).subscribe
        (foundUser =>
          {
            this.user = foundUser;
            this.musicService.GetSongsByUserId(foundUser.id).subscribe
            (foundsongs =>
              {
                this.music2edits = foundsongs;
                console.log(this.music2edits)
              })}))}
  onClick(): void
  {
    
  }
  onSubmit(): void{
    console.log(this.music2edits);
    this.music2edits.forEach(music2edit=>
      this.musicService.EditSongById(music2edit.id).subscribe(
        ()=>{alert('Music updated!'),
      this.router.navigate(['profile'])},
      ()=>{alert('Something went wrong :('); console.log(this.music2edits)}
      )
      )
    };
    
  changePrivacy(event: any){
    console.log(event);
  }
}
