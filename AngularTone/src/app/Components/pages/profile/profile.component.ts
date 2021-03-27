import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';

import { Track } from 'ngx-audio-player';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

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

  constructor(private userService: UserRestService) {
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
    this.userService.GetUser(1).subscribe
    (
      foundUser =>
      {
        this.user = foundUser;
      }
    )

  }

}
