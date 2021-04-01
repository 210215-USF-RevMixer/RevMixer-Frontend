import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Comments } from 'src/app/Models/Comments';
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
  addComment: any;
  getUser: User;
  
  constructor(private commentService: CommentRestService, public authService: AuthService, private userService: UserRestService) {
  this.comment =[
  {
    Id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
    user:
    {
        ID: 0,
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
      ID: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
      user:
      {
        ID: 0,
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
    Id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
    uploadMusicId: 0
  }

  this.getUser =
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
    // this.addComment.userId = this.getUser.ID;
    this.commentService.SubmitComment(this.addComment).subscribe(
      (addComment) =>
      {
        alert(`${addComment.comment} was added!`);
      }
    )
    console.log("button was pressed")
    };
}
