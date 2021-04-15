import { UsersSampleSets } from './../../../Models/UsersSampleSets';
import { SampleSetService } from './../../../services/sample-set.service';
import { ProfileComponent } from './../profile/profile.component';
import { SampleSets } from '../../../Models/SampleSets';
import { AuthService } from '@auth0/auth0-angular';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';
import { Console } from 'node:console';

@Component({
  selector: 'app-create-sample-set',
  templateUrl: './create-sample-set.component.html',
  styleUrls: ['./create-sample-set.component.scss']
})
export class CreateSampleSetComponent implements OnInit {
  user: User;
  authUser: any;
  newSampleSet: SampleSets;
  newUsersSampleSet: UsersSampleSets;
  userEmail: string = '';
  constructor(private usersSampleSets: UsersSampleSetsService,private userService: UserRestService, private authService: AuthService, private router: Router,private setsService :SampleSetService) { 
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
      name:''
    }
    this.newUsersSampleSet ={
      Id: 0,
      userId:0,
      sampleSetsId : 0
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
          this.updateUser(foundUser);   
          this.user = foundUser;
          this.userEmail = foundUser.email;
          this.newUsersSampleSet.userId = foundUser.id;
          console.log('user');
          console.log(foundUser);
          console.log('newUserSampleSet');
          console.log(this.newSampleSet);
        }
      )
    )
  }
    updateUser(foundUser: User): void {
 
    
  }

  onSubmit(): void { 
    this.setsService.AddSampleSet(this.newSampleSet,this.user.id);
    
    alert(`${this.newSampleSet.name} added to your sample sets!`);
    this.router.navigate(['profile']);
  }

}
