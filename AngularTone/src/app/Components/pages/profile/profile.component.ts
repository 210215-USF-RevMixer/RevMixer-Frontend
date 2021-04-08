import { SampleSetService } from './../../../services/sample-set.service';
import { SampleSet } from './../../../Models/SampleSet';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { environment } from 'src/environments/environment';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { debug } from 'tone';
import { PlayList } from 'src/app/Models/PlayList';
import { Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  authUser: any;
  S3Bucket: string = environment.AZURE_STORAGE;

  userMusic: UploadMusic[];
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

  //User Playlists
  allPlayLists: PlayList[] = [];
  userPlayLists: PlayList[] = [];
  allSampleSets: SampleSet[] = [];
  userSampleSets: SampleSet[] = [];

  constructor(private userService: UserRestService, private musicService: UploadedMusicRestService,private sampleService: SampleSetService, private authService: AuthService,
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
      isPrivate:false,
  
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
    
    console.log("logged at constructor " + this.userPlayLists);

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

    //Get all users playlists
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
          let x = foundUser.id;
          this.updatePlaylist(foundUser, x);
          // this.updateSampleSet(foundUser,x);
        }
      )
    )
  }

  //Update all playlist
  updatePlaylist(foundUser: User, x: any) {
    this.playlistService.GetAllPlaylists().subscribe(
      (result) => {
        this.allPlayLists = (result);
        this.updateUserPlaylist(this.allPlayLists, x);
      }
    )
  }
  //update all the sample sets 
  updateSampleSet(foundUser: User, x: any) {
    this.sampleService.GetAllSampleSets().subscribe(
      (result) => {
        this.allSampleSets = (result);
        this.updateUserSampleSets(this.allSampleSets, x);
      }
    )
  }

  updateUserSampleSets(allSampleSets: SampleSet[], x: any) {
    this.allSampleSets.forEach(set => 
      {
        if(set.userId == x)
        {
          this.userSampleSets.push(set);
        }
      })
      console.log(this.userSampleSets);
    this.router.navigate(['profile']);
  }
  //Update user playlist
  updateUserPlaylist(allPlayLists: PlayList[], x: any) {
    this.allPlayLists.forEach(playlist => 
      {
        if(playlist.userId == x)
        {
          this.userPlayLists.push(playlist);
        }
      })
      console.log(this.userPlayLists);
    this.router.navigate(['profile']);
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
  //Navigate to create new playlist component
  onNewPlayList() {
    this.router.navigate(['newPlayList']);
  }
  //Get the details of the selected playlist
  GetPlaylist(id: number) {
    console.log(this.userPlayLists);
    this.router.navigate(['viewPlaylist'], {queryParams: {id: id} });
  }
  GetSampleSet(id: number){
    console.log(this.userSampleSets);
    //this.router.navigate(['viewSamples],{queryParams: {id: id} })
  }
}
