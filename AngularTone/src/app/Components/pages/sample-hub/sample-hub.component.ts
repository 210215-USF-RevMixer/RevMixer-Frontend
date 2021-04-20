import { UsersSampleSetsService } from './../../../services/users-sample-sets.service';
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
import { UsersSampleSets } from 'src/app/Models/UsersSampleSets';
import { param } from 'jquery';

@Component({
  selector: 'app-sample-hub',
  templateUrl: './sample-hub.component.html',
  styleUrls: ['./sample-hub.component.scss']
})
export class SampleHubComponent implements OnInit {
  user: User;
  authUser: any;
  samplePlaylist: SamplePlaylist[] = [];
  allSamples: Sample[] = [];
  userSampleSets: UsersSampleSets[] = [];
  usersSampleToAdd: UsersSample;
  neededSamples: Sample[] = [];
  paramFlag: boolean = false;
  ownerFlag: boolean = false;
  samplePlaylist2Add: SamplePlaylist;
  //NEED TO ADD SAMPLE ENDPOINT, NOT IN README ATM
  sampleStorage: string = environment.SAMPLE_STORAGE;

  constructor(private userSampleSetService: UsersSampleSetsService, private samplePlaylistService: SamplePlaylistService, private activeRoute: ActivatedRoute, private userService: UserRestService, private sampleService: SampleService, private usersSampleService: UserssampleService, private authService: AuthService,
    private router: Router, private playlistService: PlaylistServiceService, private sampleSetService: SampleSetService) {
    this.allSamples.forEach(element => {
      this.allSamples.pop();
    });
    this.neededSamples.forEach(element => {
      this.neededSamples.pop();
    });
    this.paramFlag = false;
    this.ownerFlag = false;
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
    }

    this.usersSampleToAdd =
    {
      Id: 0,
      userId: 0,
      sampleId: 0,
      isOwner: true
    }
    this.samplePlaylist2Add = {
      Id: 0,
      sampleId: 0,
      sampleSetId: 0

    }
  }

  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe(
        params => {
          if (params.id > 0) {
            this.paramFlag = true;
          }
        });
    this.activeRoute.queryParams
      .subscribe(
        params => {

          this.samplePlaylistService.GetAllSamplePlaylists().subscribe(
            result => {
              result.forEach(element1 => {
                if (element1.sampleSetId == params.id) {
                  this.allSamples.forEach(element2 => {
                    if (element2.id == element1.sampleId) {
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
            foundUser => {
              this.user = foundUser;
              this.activeRoute.queryParams
                .subscribe(
                  params => {
                    // this.userSampleSetService.GetUsersSampleSetByUserId(this.user.id).subscribe(
                    //   result =>{
                    //     this.userSampleSets=result;
                    //     this.userSampleSets.forEach(element => {
                    //       if(element.sampleSetsId == params.id && element.isOwner){
                    //         this.ownerFlag = true;
                    //       }
                    //     });
                    //   }
                    // )
                    this.UserSampleSetCheck(this.user.id, params.id);
                    this.GetSamplePlaylists(params.id);

                    if(params.id)
                    {
                      this.samplePlaylistService.GetAllSamplePlaylists().subscribe(
                        result => {
                          var playListExist = false;
                          for (let i = 0; i < result.length; i++) {
                            if (result[i].sampleSetId == params.id) {
                              playListExist = true
                            }
                          }
                          if(!playListExist && !this.ownerFlag)
                          {
                            {
                              alert('This Sample Set is a work in progress try coming back in a bit!');
                              window.history.back();
                            }
                          }
                        }
                      )
                    }
                  });
              this.sampleService.GetSamples().subscribe
                (
                  foundSamples => {
                    this.allSamples = foundSamples;
                    // this.PopulateAudioPlayer(foundsongs);
                  }
                )
            }
          )
    )

    // //add is owner to make sure the person can add samples to set
    // if(this.paramFlag && this.neededSamples.length==0 && this.ownerFlag==false){
    //   alert('This Sample Set is a work in progress try coming back in a bit!')
    //   window.history.back();
    // }
    // else if(this.paramFlag && this.neededSamples.length == 0){
    //   alert('This set is currently empty try adding some Samples!');
    //   console.log();
    // }else{
    //   console.log();
    // }


  }

  UserSampleSetCheck(userId: number, param: number) {
    this.userSampleSetService.GetUsersSampleSetByUserId(userId).subscribe(
      (result: UsersSampleSets[]) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].userId == userId && result[i].isOwner && param == result[i].sampleSetsId) {
            this.ownerFlag = true;
          }
        }
      }
    )
  }
  GetSamplePlaylists(param: number) {
    this.samplePlaylistService.GetAllSamplePlaylists().subscribe(
      (result) => {
        this.samplePlaylist = result;
        this.FilterPlaylist(this.samplePlaylist, param);
      }
    )
  }
  FilterPlaylist(playlist: SamplePlaylist[], param: number) {
    playlist.forEach(element => {
      if (element.sampleSetId == param) {
        this.FilterBySampleID(element.sampleId);
      }
    })
  }
  FilterBySampleID(sampleId: number) {
    this.sampleService.GetSampleByID(sampleId).subscribe(
      (result) => {
        this.neededSamples.push(result);
      }
    )
  }
  AddSampleToUserSamplesButtonClick(sample: Sample) {
    this.usersSampleToAdd.sampleId = sample.id;
    this.usersSampleToAdd.userId = this.user.id;
    this.usersSampleToAdd.isOwner = false;
    this.usersSampleService.AddUserSample(this.usersSampleToAdd).subscribe()
    alert(`${sample.sampleName} was added to your sample library!`);
  }
  // add the sample to sample playlist
  AddSampleToSampleSetButtonClick(sampleid: number) {
    this.samplePlaylist2Add.sampleId = sampleid
    this.activeRoute.queryParams.subscribe(
      params => {
        this.samplePlaylist2Add.sampleSetId = params.id;
      });
    this.samplePlaylistService.AddSamplePlaylist(this.samplePlaylist2Add).subscribe();
    alert('You have added a sample to your sample set');
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

  searchTable(event : any) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = event.target.value.toUpperCase()
    table = document.getElementById("sampleTable");
    tr = document.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        td = tr[i]?.getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
  }
}
