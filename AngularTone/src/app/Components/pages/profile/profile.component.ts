import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';
import { UsersSampleSets } from './../../../Models/UsersSampleSets';
import { SampleSetService } from './../../../services/sample-set.service';
import { SampleSets } from "../../../Models/SampleSets";
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
import { SampleService } from 'src/app/services/sample.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  authUser: any;
  musicBucket: string = environment.MUSIC_STORAGE;

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
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;

  //User Playlists
  allPlayLists: PlayList[] = [];
  userPlayLists: PlayList[] = [];
  allSampleSets: SampleSets[] = [];
  userSampleSets: UsersSampleSets[] = [];

  constructor(private userService: UserRestService, private musicService: UploadedMusicRestService,private sampleService: SampleSetService, private userSampleSetsService: UsersSampleSetsService, private individualSampleService: SampleService, private authService: AuthService,
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
    },

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
    }],

    this.audioPlayer = 
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },

    this.audioCollection = [
      this.audioPlayer
    ],
    
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
          
          this.user.email = foundUser.email;
          this.individualSampleService.GetSamplesByUserID(foundUser.id).subscribe
          (
            foundsamples =>
            {
              this.user.sample = foundsamples;
            }
          )
          

          
          this.musicService.GetSongsByUserId(foundUser.id).subscribe
          (
            foundsongs =>
            {
              this.user.uploadMusics = foundsongs;
              this.userMusic = foundsongs;
              this.PopulateAudioPlayer(foundsongs, foundUser);

              //this.updatePlaylist(foundUser,foundUser.id) ;
              this.playlistService.GetAllPlaylists().subscribe(
                (result) => {
                  this.allPlayLists = (result);
                  this.updateUserPlaylist(this.allPlayLists, foundUser.id);
                }
              )


              //update the users samplesets
              console.log(foundUser);
              
              this.userSampleSetsService.GetAllUsersSampleSet().subscribe(
                (result) => {
                  result.forEach((element: UsersSampleSets) => {
                    if(element.userId== 1){
                      this.userSampleSets.push(element);
                      console.log(this.userSampleSets);
                    }
                  });
                  console.log('usersamplesets');
                  console.log(this.userSampleSets);
                  
                }
              )
            }
          )

        }
      )
    )
  }

  //Update all playlist- MOVED TO WITHIN THE AUTH0
  // updatePlaylist(foundUser: User, x: any) {
  //   this.playlistService.GetAllPlaylists().subscribe(
  //     (result) => {
  //       this.allPlayLists = (result);
  //       this.updateUserPlaylist(this.allPlayLists, x);
  //     }
  //   )
  // }

  // K- fix with the new userSampleSets
  //update all the sample sets 
  // updateSampleSet(foundUser: User) {
  //   this.userSampleSetsService.GetUsersSampleSetByUserId(foundUser.id).subscribe(
  //     (result) => {
  //       console.log(foundUser);
  //       this.userSampleSets = (result);
  //       console.log(this.userSampleSets);
  //     }
  //   )
  // }

  // updateUserSampleSets(allSampleSets: SampleSets[], x: any) {
  //   this.allSampleSets.forEach(set => 
  //     {
  //       if(set.userId == x)
  //       {
  //         this.userSampleSets.push(set);
  //       }
  //     })
  //     console.log(this.userSampleSets);
  //   this.router.navigate(['profile']);
  // }
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


  PopulateAudioPlayer(foundDbMusic: UploadMusic[], foundUser: any)
  {

    var counter = 0;
    foundDbMusic.forEach(songFound => {
      if(counter == 0){
        this.audioCollection[counter].artist = foundUser.email;
        this.audioCollection[counter].link = this.musicBucket + "/" + songFound.musicFilePath;
        this.audioCollection[counter].title = songFound.name;
        counter++;
      }
      else {
        var fileToAddToPlaylist = new Track;

        fileToAddToPlaylist.artist = foundUser.email;
        fileToAddToPlaylist.link = this.musicBucket + "/" + songFound.musicFilePath;
        fileToAddToPlaylist.title = songFound.name;
        this.audioCollection.push(fileToAddToPlaylist);
      }


    });
  }
  //Navigate to create new playlist component
  onNewPlayList() {
    this.router.navigate(['newPlayList']);
  }
  onNewSampleSet() {
    this.router.navigate(['newSampleSet']);
  }
  //Get the details of the selected playlist
  GetPlaylist(id: number) {
    console.log(this.userPlayLists);
    this.router.navigate(['viewPlaylist'], {queryParams: {id: id} });
  }
  GetSampleSet(id: number){
    console.log(this.userSampleSets);
    this.router.navigate(['sampleHub'],{queryParams: {id: id} });
  }
  EditSongs(id: number){
    console.log(this.userMusic)
        this.router.navigate(['editSongs'], {queryParams: {id: id}});
  }
}
