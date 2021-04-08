import { SampleSet } from './../../../Models/SampleSet';
import { Sample } from './../../../Models/Sample';
import { SampleSetService } from './../../../services/sample-set.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';

@Component({
  selector: 'app-sample-sets',
  templateUrl: './sample-sets.component.html',
  styleUrls: ['./sample-sets.component.scss']
})
export class SampleSetsComponent implements OnInit {
  selectedSet: SampleSet ;
  allSampleSets: SampleSet [] = [];
  constructor(private activeRoute: ActivatedRoute, 
    private uploadMusicService: UploadedMusicRestService, private sampleService: SampleSetService,
    private route: Router) { 
      this.selectedSet = {
        id: 0,
        userId: 0, 
        isPrivate:false,
        name:'',
        user:
        {
          id: 0,
          userName: '',
          email: '',
          isAdmin: false,
          userProjects: [],
          sample: [],
          comments: [],
          uploadMusics: [],
          playlists: []
        },
        samples:[]
      }
    }

  ngOnInit(): void {
    this.sampleService.GetAllSampleSets().subscribe(
      (result) =>
      {
        let set = result;
        this.GetAllSamples(set);
      }
    )
  }
  GetAllSamples(sets: SampleSet[]){
    sets.forEach(set=>{
      this.allSampleSets.push(set);
    })
    console.log(this.allSampleSets);
  }
  // GetSample(id: number) {
  //   console.log(this.userPlayLists);
  //   this.router.navigate(['viewPlaylist'], {queryParams: {id: id} });
  // }

}





