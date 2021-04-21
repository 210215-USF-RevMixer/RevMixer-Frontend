import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import {PlayList} from 'src/app/Models/PlayList';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  //Fields
  user: User;
  authUser: any;
  newPlaylist: PlayList;
  userEmail: string = '';
  constructor(private userService: UserRestService, private authService: AuthService, private playListService: PlaylistServiceService,
    private router: Router) { 
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
    };
    this.newPlaylist = 
    {
      id: 0,
      userId: 0,
      name: '',
      user: {
        userName: '',
        id: 0,
        email: '',
        role: '',
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      musicPlaylist: [],
    }
  }

  ngOnInit(): void {

    //Retreive logged in user
    this.authService.user$.subscribe
    (
      au =>
      this.authUser = au
    )
    this.authService.user$.subscribe
    (
      authUser => this.userService.GetUserByEmail(authUser!.email!).subscribe
      (
        foundUser =>
        {
          let x = foundUser.id;
          this.updateUser(foundUser, x);
        }
      )
    )
  }
  //Method to update the user and playlist userID
  updateUser(foundUser: User, x: any): void {
    this.user = foundUser;
    this.userEmail = foundUser.email;
    this.newPlaylist.userId = x;
    this.newPlaylist.user = foundUser;
  }
  //When the user submits the name of the playlist
  onSubmit(): void {
    this.playListService.AddPlaylist(this.newPlaylist).subscribe(
      (PlayList) => {
        alert(`${PlayList.name} added to your playlists!`);
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
