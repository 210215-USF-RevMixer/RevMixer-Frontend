import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;


  constructor(private userService: UserRestService) {
    this.user = 
    {
      userName: '',
      ID: 0,
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
    this.userService.GetUser(1).subscribe
    (
      foundUser =>
      {
        this.user = foundUser;
      }
    )

  }

}
