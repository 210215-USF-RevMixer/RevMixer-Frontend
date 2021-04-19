import { UsersSampleSets } from './../../../Models/UsersSampleSets';
import { SamplePlaylist } from './../../../Models/SamplePlaylist';
import { SamplePlaylistService } from './../../../services/sample-playlist.service';
import { SampleService } from './../../../services/sample.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sample } from 'src/app/Models/Sample';
import { SampleSets } from 'src/app/Models/SampleSets';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { AmdDependency } from 'typescript';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-view-sample-set',
  templateUrl: './view-sample-set.component.html',
  styleUrls: ['./view-sample-set.component.scss']
})
export class ViewSampleSetComponent implements OnInit {
  selectedSampleSet: UsersSampleSets;
  currentPlaylist:SamplePlaylist[]=[];
  sampleSet: any;
  samplePlaylist:SamplePlaylist;
  foundSet: SampleSets[]=[];
  allSamples: Sample[]=[];
  allSets:SampleSets[]=[];
  sampleSampleSets: SampleSets[]=[];
  user: User;
  authUser: any;
  constructor(private authService: AuthService, private userService: UserRestService, private sampleSetService: SampleSetService, private sampleService : SampleService,private activeRoute: ActivatedRoute,private samplePlaylistService: SamplePlaylistService) {    
    this.selectedSampleSet = {
      id:0,
      userId:0,
      sampleSetsId:0,
      isOwner: false
    }
    this.sampleSet =
    {
      id: 0,
      name: '',
      userId:0
    }
    this.samplePlaylist=
    {
      Id: 0,
      sampleId: 0,
      sampleSetId: 0
    }
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
        }
      )
    )




    this.activeRoute.queryParams
    .subscribe(
      params =>
      {
        this.sampleSetService.GetSampleSet(params.id).subscribe(
          foundSet => {
            //set the selected sampleset
            this.selectedSampleSet = foundSet;
            //Gets the music playlist for this particular playlist!
            this.GetSamplesFromPlaylist(foundSet.id);
          }
        )
      }
    
    );
    this.sampleService.GetSamples().subscribe(
      (result) =>
      {
        let sample = result;
        this.allSamples.push(sample);
      }
    )
  }

  GetAllSets(sets: SampleSets[]) {
    sets.forEach(set =>
      {
        this.allSets.push(set);
      })
      console.log('all the sets');
      console.log(this.allSets);
  }

  //method to get all the samplePlaylists for the userSampleSet
  GetSamplesFromPlaylist(selectedSet: SampleSets){
    this.samplePlaylistService.GetSamplePlaylistById(selectedSet.id).subscribe(
    (result)=>
    {
      result.forEach((x: SamplePlaylist) => {
        this.currentPlaylist.push(x);
      });
    }
  )
  }
  //method to get all the samples from the playlist
  GetAllSamplesFromPlaylist(){
    this.currentPlaylist.forEach((list)=>{
      this.sampleService.GetSampleByID(list.Id).subscribe((result)=>{
        result.forEach((element: Sample) => {
          if(element.isPrivate==false && element.isLocked == false){
          this.allSamples.push(element);
          }
        });
      }
      )
    })
  }

  
  

  AddSampleToSamplePlaylist(sampleId: number, sampleSetId: number){
    this.samplePlaylist.Id = 0;
    this.samplePlaylist.sampleId = sampleId;
    this.samplePlaylist.sampleSetId = sampleSetId;
    this.samplePlaylistService.AddSamplePlaylist(this.samplePlaylist);
  }
}
