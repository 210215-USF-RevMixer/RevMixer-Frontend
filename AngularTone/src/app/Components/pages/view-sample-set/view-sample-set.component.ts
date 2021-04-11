import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SampleSets } from 'src/app/Models/SampleSets';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { AmdDependency } from 'typescript';

@Component({
  selector: 'app-view-sample-set',
  templateUrl: './view-sample-set.component.html',
  styleUrls: ['./view-sample-set.component.scss']
})
export class ViewSampleSetComponent implements OnInit {
  selectedSampleSet: SampleSets;
  sampleSet: any;
  allSets:SampleSets[]=[];
  constructor(private sampleService: SampleSetService,private activeRoute: ActivatedRoute) {    
    this.selectedSampleSet = {
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
    this.sampleSet =
    {
      id: 0,
      userId: 0,
      sampleName: '',
      sampleLink: '',
      isPrivate: false,
      isApproved: false,
      isLocked: false,
    }
  }

  ngOnInit(): void {
    // this.activeRoute.queryParams
    // .subscribe(
    //   params =>
    //   {
    //     this.sampleService.GetSampleSet(params.id).subscribe(
    //       foundSet => {
    //         this.setPlaylist(foundSet);
    //         //Gets the music playlist for this particular playlist!
    //         this.SetAllMusicPlaylistToThisPlaylist(foundSet.id);
    //       }
    //     )
    //   }
    // );

  }
//   setPlaylist(foundSet: SampleSets) {
//     this.selectedSampleSet = foundSet;
//   }
//   SetAllMusicPlaylistToThisPlaylist(sampleID: number) {
//     this.sampleService.GetAllSampleSets().subscribe(
//       (result => {
//         result.forEach(set => {
//           if(set.playListId == sampleID) {
//             this.playlistMusicPlaylist.push(set);
//           }
//         })
//         let x = this.playlistMusicPlaylist;
//         this.GetUploadedMusicForPlaylist(x);
//       })
//     )
//     console.log(this.playlistMusicPlaylist);
//   }

}
