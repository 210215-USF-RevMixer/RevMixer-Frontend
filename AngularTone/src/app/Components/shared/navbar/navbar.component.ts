import { Component, OnInit } from '@angular/core';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
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
  userName: string;
  BooLMAO: boolean = false;

  constructor(public auth: AuthService, private userService: UserRestService) {
    this.userBackend = 
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
    this.userName = ''
  }

  ngOnInit(): void {
    this.auth.user$.subscribe (
      user =>

      this.userService.GetUserByEmail(user!.email!).subscribe
      (
        foundUser =>
        {
          this.userBackend = foundUser;
          if (this.userBackend.role == "Admin"){
            this.BooLMAO = true;
          }
        }
      )
    )

  }
}
