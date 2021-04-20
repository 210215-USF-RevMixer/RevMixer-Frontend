import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SampleSets } from 'src/app/Models/SampleSets';
import { User } from 'src/app/Models/User';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Samples } from 'tone/build/esm/core/type/Units';

@Component({
  selector: 'app-edit-sample-sets',
  templateUrl: './edit-sample-sets.component.html',
  styleUrls: ['./edit-sample-sets.component.scss']
})
export class EditSampleSetsComponent implements OnInit {

  samplesets2edit: SampleSets[];
  user: User;
  authUser: any;
  constructor(private router: Router, private sampleSetService: SampleSetService,
    private authService: AuthService, private userService: UserRestService) {
    this.samplesets2edit = 
    [{
      id: 0,
      name: ''
    }],
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
    }

    ngOnInit(): void {
      this.authService.user$.subscribe(
        au =>
        this.authUser = au
      )
      this.authService.user$.subscribe(
        authUser =>
        this.userService.GetUserByEmail(authUser.email).subscribe
        (foundUser =>
          {
            this.user = foundUser;
            this.sampleSetService.GetUserSampleSets(foundUser.id).subscribe
            (foundsamplesets =>
              {
                this.samplesets2edit = foundsamplesets;
                console.log(this.sampleSetService)
              })}))}
  onClick(): void
  {
    
  }
  onSubmit(): void{
    console.log(this.sampleSetService);
    this.samplesets2edit.forEach(foundsamplesets=>
      this.sampleSetService.EditSampleSet(foundsamplesets.id).subscribe(
        ()=>{alert('Music updated!'),
      this.router.navigate(['profile'])},
      ()=>{alert('Something went wrong :('); console.log(this.sampleSetService)}
      )
      )
    };
    
  changePrivacy(event: any){
    console.log(event);
  }
}
