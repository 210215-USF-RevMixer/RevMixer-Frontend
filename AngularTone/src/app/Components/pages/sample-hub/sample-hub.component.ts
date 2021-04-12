import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { SampleService } from 'src/app/services/sample.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sample-hub',
  templateUrl: './sample-hub.component.html',
  styleUrls: ['./sample-hub.component.scss']
})
export class SampleHubComponent implements OnInit {
  user: User;
  authUser: any;
  S3Bucket: string = environment.AZURE_STORAGE;

  //uploadSample: UploadSample
  audioPlayer: Track;

  audioCollection: Track[];
  
  //audio player settings
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [10,10,10];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  
  constructor(private userService: UserRestService, private sampleService: SampleService, private authService: AuthService,
    private router: Router, private playlistService: PlaylistServiceService) {
      
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
      authUser =>

      this.userService.GetUserByEmail(authUser.email).subscribe
      (
        foundUser =>
        {
          this.user = foundUser;

          this.sampleService.GetSamples().subscribe
          (
            foundSamples =>
            {
              // this.userMusic = foundsongs;
              // this.PopulateAudioPlayer(foundsongs);
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
