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
  userSampleSets: UsersSampleSets[] =[];
  usersSampleToAdd: UsersSample;
  neededSamples:Sample[] =[];
  paramFlag : boolean = false;
  ownerFlag : boolean = false;
  samplePlaylist2Add: SamplePlaylist;
  //NEED TO ADD SAMPLE ENDPOINT, NOT IN README ATM
  sampleStorage: string = environment.SAMPLE_STORAGE;
  
  constructor(private userSampleSetService: UsersSampleSetsService, private samplePlaylistService:SamplePlaylistService, private activeRoute: ActivatedRoute,private userService: UserRestService, private sampleService: SampleService, private usersSampleService: UserssampleService, private authService: AuthService,
    private router: Router, private playlistService: PlaylistServiceService) {
      this.allSamples.forEach(element => {
        this.allSamples.pop();
      });
      this.neededSamples.forEach(element => {
        this.neededSamples.pop();
      });
      this.paramFlag =false;
      this.ownerFlag=false;
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
      this.samplePlaylist2Add ={
        Id:0,
        sampleId:0,
        sampleSetId:0

      }
    }

  ngOnInit(): void {
    
    this.sampleService.GetSamples().subscribe(
      r =>{
        {
          //debugger;
          let sample = r;
          this.allSamples.push(sample);
          //console.log('why doesnt this work ');
          console.log(r);
        }
      }
    )
    this.activeRoute.queryParams
    .subscribe(
      params =>
      {
      if(params.id>0){
        this.paramFlag=true;
      }
      });
    this.activeRoute.queryParams
    .subscribe(
      params =>
      {
        
        console.log('param');
        console.log(params)
        console.log('param');
        console.log(params.id)
        
        
        this.samplePlaylistService.GetAllSamplePlaylists().subscribe(
          result => {
              result.forEach(element1 => {
                if(element1.sampleSetId==params.id)
                {
                  this.allSamples.forEach(element2 => {
                    console.log('e2 ');
                    console.log(element2);
                    if(element2.id == element1.sampleId){
                      this.neededSamples.push(element2);
                      //console.log('some shit ');
                      console.log(this.neededSamples);
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
          //console.log('this shit ');
          console.log(this.neededSamples);
          this.activeRoute.queryParams
          .subscribe(
            params =>
            {
              this.userSampleSetService.GetUsersSampleSetByUserId(this.user.id).subscribe(
                result =>{
                  this.userSampleSets=result;
                  this.userSampleSets.forEach(element => {
                    if(element.sampleSetsId == params.id && element.isOwner){
                      this.ownerFlag = true;
                    }
                  });
                }
              )
          });
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

    //add is owner to make sure the person can add samples to set
    if(this.paramFlag && this.neededSamples.length==0 && this.ownerFlag==false){
      alert('This Sample Set is a work in progress try coming back in a bit!')
      window.history.back();
    }
    else if(this.paramFlag&&this.neededSamples.length==0){
      alert('This set is currently empty try adding some Samples!');
      console.log();
    }else{
      console.log();
    }
      
    
  }



  AddSampleToUserSamplesButtonClick(sampleid: number)
  {
    this.usersSampleToAdd.sampleId = sampleid;
    this.usersSampleToAdd.userId = this.user.id;
    this.usersSampleToAdd.isOwner = false;
    this.usersSampleService.AddUserSample(this.usersSampleToAdd)
  }
  // add the sample to sample playlist
  AddSampleToSampleSetButtonClick(sampleid: number){
    this.samplePlaylist2Add.sampleId = sampleid
    this.activeRoute.queryParams.subscribe(
      params=>{
        this.samplePlaylist2Add.sampleSetId=params.id;
      });
    this.samplePlaylistService.AddSamplePlaylist(this.samplePlaylist2Add);
    console.log('samplePlaylist.sampleId '+this.samplePlaylist2Add.sampleId);
    console.log('samplePlaylist.sampleSetId '+this.samplePlaylist2Add.sampleSetId);
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

}
