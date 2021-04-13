import { UsersSampleSets } from './../../../Models/UsersSampleSets';
import { SampleSets } from './../../../Models/SampleSets';
import { Sample } from './../../../Models/Sample';
import { SampleSetService } from './../../../services/sample-set.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserRestService } from 'src/app/services/user-rest.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-sample-sets',
  templateUrl: './sample-sets.component.html',
  styleUrls: ['./sample-sets.component.scss']
})
export class SampleSetsComponent implements OnInit {
  selectedSet: SampleSets ;
  allSampleSets: SampleSets [] = [];
  set2Add:UsersSampleSets ;
  user: User;
  constructor(private activeRoute: ActivatedRoute,private userService: UserRestService, private authService: AuthService,
    private uploadMusicService: UploadedMusicRestService, private sampleService: SampleSetService,
    private route: Router) { 
      this.selectedSet = {
        id: 0,
        name: ''
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
      this.set2Add= {
        Id :0,
        userId: 0,
        sampleSetsId: 0
      }
    }

  ngOnInit(): void {


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
    this.sampleService.GetAllSampleSets().subscribe(
      (result) =>
      {
        let set = result;
        this.GetAllSampleSets(set);
      }
    )
  }
  GetAllSampleSets(sets: SampleSets[]){
    sets.forEach(set=>{
      this.allSampleSets.push(set);
    })
    console.log(this.allSampleSets);
  }
  // GetSample(id: number) {
  //   console.log(this.userPlayLists);
  //   this.router.navigate(['viewPlaylist'], {queryParams: {id: id} });
  // }
  AddSampleToUserSamplesButtonClick(setId: number)
  {
    this.set2Add.sampleSetsId = setId,
    this.set2Add.userId = this.user.id 
  }


}





