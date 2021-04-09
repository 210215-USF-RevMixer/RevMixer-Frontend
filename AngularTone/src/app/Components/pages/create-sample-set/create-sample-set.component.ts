import { SampleSetService } from './../../../services/sample-set.service';
import { ProfileComponent } from './../profile/profile.component';
import { SampleSets } from '../../../Models/SampleSets';
import { AuthService } from '@auth0/auth0-angular';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-create-sample-set',
  templateUrl: './create-sample-set.component.html',
  styleUrls: ['./create-sample-set.component.scss']
})
export class CreateSampleSetComponent implements OnInit {
  user: User;
  authUser: any;
  newSampleSet: SampleSets;
  userEmail: string = '';
  constructor(private userService: UserRestService, private authService: AuthService, private router: Router,private setsService :SampleSetService) { 
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
    };
    this.newSampleSet={
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
    this.authService.user$.subscribe
    (
      au =>
      this.authUser = au
    )
    this.authService.user$.subscribe
    (
      authUser => this.userService.GetUserByEmail(authUser.email).subscribe
      (
        foundUser =>
        {
          let x = foundUser.id;
          this.updateUser(foundUser, x);
        }
      )
    )
  }
    updateUser(foundUser: User, x: any): void {
    this.user = foundUser;
    this.userEmail = foundUser.email;
    this.newSampleSet.userId = x;
    this.newSampleSet.user = foundUser;
  }

  onSubmit(): void {
    this.setsService.AddSampleSet(this.newSampleSet).subscribe(
      (sampleSet) => {
        alert(`${sampleSet.name} added to your Sample Set!`);
        this.router.navigate(['profile']);
      }
    )
    // debugger;
    // this.user.playlists.concat(this.newPlaylist);
    // this.userService.EditUser(this.user).subscribe(
    //   () =>{
    //     alert(`${this.user.email} added playlist ${this.newPlaylist.name}`);
    //     this.router.navigate(['profile']);
    //   }
    // )
  }

}
