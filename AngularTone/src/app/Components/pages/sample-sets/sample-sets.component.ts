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
  selectedSet: Sample | undefined;
  allSamples: Sample [] = [];
  constructor(private activeRoute: ActivatedRoute, 
    private uploadMusicService: UploadedMusicRestService, private sampleService: SampleSetService,
    private route: Router) { 
      this.selectedSet = {
        id: 0,
        userId: 0,
        sampleName: '',
        sampleLink: '',
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
        tracks: []
        
      }
    }

  ngOnInit(): void {
    this.sampleService.GetAllSampleSets().subscribe(
      (result) =>
      {
        let sample = result;
        this.GetAllSamples(sample);
      }
    )
  }
  GetAllSamples(samples: Sample[]){
    samples.forEach(sample=>{
      this.allSamples.push(sample);
    })
    console.log(this.allSamples);
  }
}





