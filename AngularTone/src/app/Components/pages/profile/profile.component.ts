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
  msaapPageSizeOptions = [10, 10, 10];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = true;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;

  //User Playlists
  allPlayLists: PlayList[] = [];
  userPlayLists: any[] = [];
  allSampleSets: SampleSets[] = [];
  userSampleSets: UsersSampleSets[] = [];

  //User SampleSets
  userSamples: SampleSets[] = [];
  flag: boolean = true;

  constructor(private userService: UserRestService, private musicService: UploadedMusicRestService, private sampleService: SampleSetService, private userSampleSetsService: UsersSampleSetsService, private individualSampleService: SampleService, private authService: AuthService,
    private router: Router, private playlistService: PlaylistServiceService, private sampleSetService: SampleSetService) {


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
          role: '',
          userProjects: [],
          sample: [],
          comments: [],
          uploadMusics: [],
          playlists: []
        },
        isPrivate: false,

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
            foundUser => {
              this.user.email = foundUser.email;
              this.individualSampleService.GetSamplesByUserID(foundUser.id).subscribe
                (
                  foundsamples => {
                    this.user.sample = foundsamples;
                  }
                )
              this.musicService.GetSongsByUserId(foundUser.id).subscribe
                (
                  foundsongs => {
                    this.user.uploadMusics = foundsongs;
                    this.userMusic = foundsongs;
                    this.PopulateAudioPlayer(foundsongs, foundUser);

                    this.playlistService.GetAllPlaylists().subscribe(
                      result => {
                        result.forEach(e => {
                          if (e.userId == foundUser.id) {
                            this.userPlayLists.push(e);
                          }
                        });
                      });

                    //update the users samplesets

                  }
                )
              this.userSampleSetsService.GetAllUsersSampleSet().subscribe(
                (result) => {
                  result.forEach((element: UsersSampleSets) => {
                    if (element.userId == foundUser.id) {
                      this.userSampleSets.push(element);
                      this.GetTheSampleSets(element.sampleSetsId);
                    }
                  });
                }
              )
            }
          )
    )
  }
  GetTheSampleSets(id: number) {
    this.sampleService.GetAllSampleSets().subscribe(
      (result: SampleSets[]) => {
        this.allSampleSets = result;
        this.DoesSampleSetMatchUserSample(result, id);
      }
    )
  }
  DoesSampleSetMatchUserSample(test: SampleSets[], id: number) {
    this.allSampleSets.forEach(element => {
      if (element.id == id) {
        this.userSamples.push(element);
      }
    });
  }
  PopulateAudioPlayer(foundDbMusic: UploadMusic[], foundUser: any) {

    var counter = 0;
    foundDbMusic.forEach(songFound => {
      if (counter == 0) {
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
    this.router.navigate(['viewPlaylist'], { queryParams: { id: id } });
  }
  GetSampleSet(id: number) {
    this.router.navigate(['sampleHub'], { queryParams: { id: id } });
  }
  EditSongs(id: number) {
    this.router.navigate(['editSongs'], { queryParams: { id: id } });
  }

  deleteSampleSet(setId: number, userId: any) {
    this.authService.user$.subscribe(
      au => {
        this.userService.GetUserByEmail(au.email).subscribe(
          user => {
            this.userSampleSetsService.GetUsersSampleSetByUserId(user.id).subscribe(
              results => {
                results.forEach(result => {
                  if (result.sampleSetsId === setId && result.isOwner === true) {
                    if (confirm('You own this sample set.  Are you sure you want to delete it from everyone\'s library?')) {
                      this.userSampleSetsService.GetAllUsersSampleSet().subscribe(
                        allUserSampleSets => {
                          for (let i = 0; i < allUserSampleSets.length; i++) {
                            if (allUserSampleSets[i].sampleSetsId === setId) {
                              this.userSampleSetsService.DeleteSampleSet(allUserSampleSets[i].id).subscribe()
                            }
                          }
                        }
                      )
                      this.sampleSetService.GetAllSampleSets().subscribe(
                        allSampleSets => {
                          for (let i = 0; i < allSampleSets.length; i++) {
                            if (allSampleSets[i].id === setId) {
                              this.sampleSetService.DeleteSampleSet(allSampleSets[i].id).subscribe()
                            }
                          }
                        }
                      )
                      this.userSamples.splice(results.indexOf(result), 1)
                    }
                  }

                  if (result.sampleSetsId === setId && result.isOwner === false) {
                    if (confirm('Are you sure you want to remove this sample set from your library?')) {
                      this.userSamples.splice(results.indexOf(result), 1)
                      this.userSampleSetsService.DeleteSampleSet(result.id).subscribe()
                    }
                  }
                })
              })
          }
        )
      }
    )
  }

  deletePlaylist(playlist: any){
    this.userPlayLists.splice(this.userPlayLists.indexOf(playlist), 1)
    this.playlistService.DeletePlaylistById(playlist.id).subscribe()
  }
}
