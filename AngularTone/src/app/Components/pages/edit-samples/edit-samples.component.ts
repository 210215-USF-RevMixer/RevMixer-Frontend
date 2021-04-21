import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Sample } from 'src/app/Models/Sample';
import { User } from 'src/app/Models/User';
import { SampleService } from 'src/app/services/sample.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-edit-samples',
  templateUrl: './edit-samples.component.html',
  styleUrls: ['./edit-samples.component.scss']
})
export class EditSamplesComponent implements OnInit {
  authUser: any;
  user: User;
  samples2edit: Sample[];
  constructor(private router: Router, private sampleService: SampleService,
    private authService: AuthService, private userService: UserRestService) {
      this.samples2edit = 
      [{
        id: 0,
        sampleName: '',
        sampleLink: '',
        isPrivate: false,
        isApproved: false,
        isLocked: false,
        tracks: []
      }]
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
    this.sampleService.GetSamples().subscribe
          (foundsamples =>
            {
              this.samples2edit = foundsamples;
              console.log(this.samples2edit)
            }
            )
    this.authService.user$.subscribe(
      au =>
      this.authUser = au
    )
    this.authService.user$.subscribe(
      authUser =>
      this.userService.GetUserByEmail(authUser!.email!).subscribe
      (foundUser =>
        {
          this.user = foundUser;
          // this.sampleService.GetSamples().subscribe
          // (foundsamples =>
          //   {
          //     this.samples2edit = foundsamples;
          //     console.log(this.samples2edit)
          //   }
          //   )
          }
          )
          )
        }
}
