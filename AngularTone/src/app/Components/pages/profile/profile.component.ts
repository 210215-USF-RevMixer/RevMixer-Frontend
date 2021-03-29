import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { Console } from 'node:console';
import { environment } from 'src/environments/environment';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { debug } from 'tone';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  authUser: any;
  S3Bucket: string = environment.AMAZON_S3;

  userMusic: UploadMusic[];
  audioPlayer: Track;

  audioCollection: Track[];

  //audio player settings
  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  constructor(private userService: UserRestService, private musicService: UploadedMusicRestService, private authService: AuthService) {
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

          this.musicService.GetSongsByUserId(foundUser.id).subscribe
          (
            foundsongs =>
            {
              this.userMusic = foundsongs;
              this.PopulateAudioPlayer(foundsongs);

            }
          )

        }
      )
    )
    
  }

  PopulateAudioPlayer(foundDbMusic: UploadMusic[])
  {
    var counter = 0;
    foundDbMusic.forEach(songFound => {
      if(counter == 0){
        this.audioCollection[counter].artist = songFound.user.email;
        this.audioCollection[counter].link = this.S3Bucket + "/" + songFound.musicFilePath;
        this.audioCollection[counter].title = songFound.name;
        counter++;
      }
      else {
        var fileToAddToPlaylist = new Track;

        fileToAddToPlaylist.artist = songFound.user.email;
        fileToAddToPlaylist.link = this.S3Bucket + "/" + songFound.musicFilePath;
        fileToAddToPlaylist.title = songFound.name;
        this.audioCollection.push(fileToAddToPlaylist);
      }


    });
  }

}
