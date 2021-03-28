import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { Console } from 'node:console';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  authUser: any;

  audioPlayer: Track;

  audioCollection: Track[];

  //audio player settings
  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;

  constructor(private userService: UserRestService, private authService: AuthService) {
    this.user = 
    {
      userName: '',
      ID: 0,
      email: '',
      isAdmin: false,
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    }

    this.audioPlayer = 
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    }

    this.audioCollection = [
      this.audioPlayer
    ]





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
          this.user = foundUser;
        }
      )

    
    )

    // this.userService.GetUser(this.user.ID).subscribe
    // (
    //   foundUser =>
    //   {
    //     this.user = foundUser;
    //   }
    // )

  }

}
