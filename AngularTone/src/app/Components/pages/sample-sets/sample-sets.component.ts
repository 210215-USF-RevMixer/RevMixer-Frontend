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
import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';

@Component({
  selector: 'app-sample-sets',
  templateUrl: './sample-sets.component.html',
  styleUrls: ['./sample-sets.component.scss']
})
export class SampleSetsComponent implements OnInit {
  selectedSet: SampleSets;
  allSampleSets: SampleSets[] = [];
  set2Add: UsersSampleSets;
  user: User;
  constructor(private activeRoute: ActivatedRoute, private userService: UserRestService, private authService: AuthService,
    private uploadMusicService: UploadedMusicRestService, private sampleService: SampleSetService,
    private router: Router, private userSampleSetService: UsersSampleSetsService) {
    this.selectedSet = {
      id: 0,
      name: ''
    }
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
    this.set2Add = {
      id: 0,
      userId: 0,
      sampleSetsId: 0,
      isOwner: false
    }
  }

  ngOnInit(): void {


    this.authService.user$.subscribe(
      authUser =>

        this.userService.GetUserByEmail(authUser.email).subscribe
          (
            foundUser => {
              this.user = foundUser;
            }
          )
    )
    this.sampleService.GetAllSampleSets().subscribe(
      (result) => {
        let set = result;
        this.GetAllSampleSets(set);
      }
    )
  }

  GetAllSampleSets(sets: SampleSets[]) {
    sets.forEach(set => {
      this.allSampleSets.push(set);
    })
  }
  //add the creator functionality by useing the isOwner and getting the 
  //user info from user service 


  GetSamples(id: number) {
    this.router.navigate(['sampleHub'], { queryParams: { id: id } });
  }
  AddSampleSetToUserSampleSetsButtonClick(setId: number) {
    let tempFlag = false
    this.userSampleSetService.GetUsersSampleSetByUserId(this.user.id).subscribe(
      result => {
        result.forEach(userSampleSet => {
          if (setId == userSampleSet.sampleSetsId) {
            tempFlag = true
          }
        })
        if (tempFlag) {
          alert(`This sample set is already in your library!`)
        }
        else {
          this.set2Add.sampleSetsId = setId
          this.set2Add.userId = this.user.id
          this.userSampleSetService.AddUsersSampleSet(this.set2Add).subscribe()
          alert(`This sample set has been added to your sample sets!`)
        }
      }
    )
  }

  searchTable(event : any) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = event.target.value.toUpperCase()
    table = document.getElementById("sampleSetTable");
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





