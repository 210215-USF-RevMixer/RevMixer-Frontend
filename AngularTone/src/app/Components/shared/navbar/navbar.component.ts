import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userBackend: User;
  constructor(public auth: AuthService, private userService: UserRestService) {
    this.userBackend = 
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
  }


  GetUser(userName: string)
  {
    this.userService.GetUserByEmail(userName).subscribe
    (
      foundUser =>
      {
        this.userBackend = foundUser;
      }
    )
  }
}
