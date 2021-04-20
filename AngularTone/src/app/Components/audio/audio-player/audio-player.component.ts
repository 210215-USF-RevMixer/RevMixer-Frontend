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
  
  S3Bucket: string = environment.MUSIC_STORAGE;
  
  userMusic: UploadMusic[];
  playlist: Track[];

  singleTrack: Track;
  user: User;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  constructor (private hubService: HubRestService, private authService: AuthService, private userService: UserRestService)

  {

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

    this.userMusic = [{
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      uploadDate: new Date,
      likes: 0,
      plays: 0,
  
      user: {
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
      isPrivate: false,
  
      musicPlaylists: [],
      comments: []
    }]


  this.singleTrack= 
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },

  this.playlist = [
    this.singleTrack
  ]
}

ngOnInit(): void {


  this.hubService.GetAllUpload().subscribe
    (
      foundsongs =>
      {
        //debugger;
        this.userMusic = foundsongs;
        //this.PopulateCreatorList();
        this.PopulateAudioPlayer(foundsongs);
      }
    )
}

//PopulateCreatorList(uploadMusic: UploadMusic)

PopulateAudioPlayer(foundDbMusic: UploadMusic[])
  {
    let counter = 0;
    foundDbMusic.forEach(songFound => {
      if(counter == 0){
        //this.playlist[counter].artist = songFound;
        this.userService.GetUser(songFound.userId).subscribe(
          (result) =>
          this.playlist[counter].artist = result.email
        )
        this.playlist[counter].link = this.S3Bucket + "/" + songFound.musicFilePath;
        this.playlist[counter].title = songFound.name;
        counter++;
      }
      else {
        var fileToAddToPlaylist = new Track;
        this.userService.GetUser(songFound.userId).subscribe(
          (result) =>
          fileToAddToPlaylist.artist = result.email
        )
        //fileToAddToPlaylist.artist = songFound.user.email;
        fileToAddToPlaylist.link = this.S3Bucket + "/" + songFound.musicFilePath;
        fileToAddToPlaylist.title = songFound.name;
        this.playlist.push(fileToAddToPlaylist);
      }
      });
}
}