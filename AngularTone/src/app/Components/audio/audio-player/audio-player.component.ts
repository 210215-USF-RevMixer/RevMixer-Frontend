import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';  
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { HubRestService } from 'src/app/services/hub-rest.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  
  S3Bucket: string = environment.AMAZON_S3;
  authUser: any;
  userMusic: UploadMusic[];
  playlist: Track[];
  audioPlayer: Track;
  user: User;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  constructor (private musicService: UploadedMusicRestService,private userService: UserRestService, private authService: AuthService, private hubService: HubRestService)
  
  {

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

    this.userMusic = [{
      ID: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      uploadDate: new Date,
      likes: 0,
      plays: 0,
  
      user: {
        userName: '',
        ID: 0,
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
    }]


  this.audioPlayer= 
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },

  this.playlist = [
    this.audioPlayer
  ]
}

ngOnInit(): void {
  this.hubService.GetAllUpload().subscribe
    (
      foundsongs =>
      {
        this.userMusic = foundsongs;
        this.PopulateAudioPlayer(foundsongs);
      }
    )
}

PopulateAudioPlayer(foundDbMusic: UploadMusic[])
{
  var counter=0;
  foundDbMusic.forEach(songFound => {
    this.playlist[counter].link = this.S3Bucket + "/" + songFound.musicFilePath;
    this.playlist[counter].title = songFound.name;
    counter ++;
  });
}
}
