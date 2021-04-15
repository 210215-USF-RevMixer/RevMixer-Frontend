import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'ngx-audio-player';
import { Sample } from 'src/app/Models/Sample';
import { SamplePlaylist } from 'src/app/Models/SamplePlaylist';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { UsersSample } from 'src/app/Models/UsersSample';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { SamplePlaylistService } from 'src/app/services/sample-playlist.service';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { SampleService } from 'src/app/services/sample.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { UserssampleService } from 'src/app/services/userssample.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sample-hub',
  templateUrl: './sample-hub.component.html',
  styleUrls: ['./sample-hub.component.scss']
})
export class SampleHubComponent implements OnInit {
  user: User;
  authUser: any;
  samplePlaylist: SamplePlaylist[]=[];
  allSamples: Sample[] = [];
  usersSampleToAdd: UsersSample;
  neededSamples:Sample[] =[];

  //NEED TO ADD SAMPLE ENDPOINT, NOT IN README ATM
  sampleStorage: string = environment.SAMPLE_STORAGE;
  
  constructor(private samplePlaylistService:SamplePlaylistService, private activeRoute: ActivatedRoute,private userService: UserRestService, private sampleService: SampleService, private usersSampleService: UserssampleService, private authService: AuthService,
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

      this.usersSampleToAdd = 
      {
        Id: 0,
        userId: 0,
        sampleId: 0,
        isOwner: true
      }

    }

  ngOnInit(): void { 
    this.sampleService.GetSamples().subscribe(
      r =>{
        {
          let sample = r;
          this.allSamples.push(sample);
        }
      }
    )

    this.activeRoute.queryParams
    .subscribe(
      params =>
      {
        this.samplePlaylistService.GetAllSamplePlaylists().subscribe(
          result => {
            console.log('the result')
            console.log(result);
              result.forEach(element1 => {
                if(element1.sampleSetId==params.id)
                {
                  this.allSamples.forEach(element2 => {
                    if(element2.id == element1.sampleId){
                      this.neededSamples.push(element2);
                    }
                  });
                }
              });
          }
        )
      }
    );
    
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
              this.allSamples = foundSamples;
              // this.PopulateAudioPlayer(foundsongs);
            }
          )
        }
      )
    )
    if(this.neededSamples.length>0){
      this.allSamples = this.neededSamples;
    }
  }



  AddSampleToUserSamplesButtonClick(sampleid: number)
  {
    this.usersSampleToAdd.sampleId = sampleid;
    this.usersSampleToAdd.userId = this.user.id;
    this.usersSampleToAdd.isOwner = false;
    this.usersSampleService.AddUserSample(this.usersSampleToAdd)
  }

  // PopulateAudioPlayer(foundDbMusic: UploadMusic[])
  // {
  //   var counter = 0;
  //   foundDbMusic.forEach(songFound => {
  //     if(counter == 0){
  //       this.audioCollection[counter].artist = songFound.user.email;
  //       this.audioCollection[counter].link = this.S3Bucket + "/" + songFound.musicFilePath;
  //       this.audioCollection[counter].title = songFound.name;
  //       counter++;
  //     }
  //     else {
  //       var fileToAddToPlaylist = new Track;

  //       fileToAddToPlaylist.artist = songFound.user.email;
  //       fileToAddToPlaylist.link = this.S3Bucket + "/" + songFound.musicFilePath;
  //       fileToAddToPlaylist.title = songFound.name;
  //       this.audioCollection.push(fileToAddToPlaylist);
  //     }


  //   });
  // }

}
