import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Comments } from 'src/app/Models/Comments';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { CommentRestService } from 'src/app/services/comment-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: Comments[];
  addComment: Comments;
  getUser: User;
  
  constructor(private commentService: CommentRestService, public authService: AuthService, private userService: UserRestService) {
  this.comment =[
  {
    id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
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
    uploadMusicId: 0,
    uploadMusic: 
    {
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
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
      musicPlaylists: [],
      comments: [],
      uploadDate: new Date
    }
  }
  ]
  

  this.addComment = 
  {
    id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
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
    uploadMusicId: 0,
    uploadMusic: 
    {
      id: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
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
      musicPlaylists: [],
      comments: [],
      uploadDate: new Date
    }
  }
  this.getUser =
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
    }

  }


  ngOnInit(): void {
    
    this.commentService.GetAllComment().subscribe
    (
      foundUser =>
      {
        this.comment = foundUser;
      }
    )
    this.authService.user$.subscribe
    (
      authUser =>

      this.userService.GetUserByEmail(authUser.email).subscribe
      (
        foundUser =>
        {
          this.getUser = foundUser;
        }
      )
    )
  }

  onSubmit(): void{
    this.addComment.userId = this.getUser.id;
    this.commentService.SubmitComment(this.addComment).subscribe(
      (addComment) =>
      {
        alert(`${addComment.comment} was added!`);
      }
    )
    console.log("button was pressed")
    };
}
