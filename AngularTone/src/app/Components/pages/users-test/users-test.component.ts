import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserProject } from 'src/app/Models/UserProject';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-users-test',
  templateUrl: './users-test.component.html',
  styleUrls: ['./users-test.component.scss']
})
export class UsersTestComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserRestService) {}

  ngOnInit(): void {

    this.userService.GetAllUsers().subscribe(
      (result) =>
      {
        this.users = result;
      }
    )

  }

}
