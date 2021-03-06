import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Comments } from 'src/app/Models/Comments';
import { User } from 'src/app/Models/User';
import { CommentRestService } from 'src/app/services/comment-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: Comments[];
  addComment: any;
  getUser: User;
  userNames: any[] = [];
  formattedDate: any[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
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
        role: '',
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
        role: '',
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      isPrivate:false,
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
    uploadMusicId: 5
  }

  this.getUser =
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
    
    this.commentService.GetAllComment().subscribe
    (
      comments =>
      {
        this.comment = comments;
        this.comment.forEach( (comment) =>{
          this.formattedDate.push(this.datePipe.transform(comment.commentData, 'short'));
          this.userService.GetUser(comment.userId).subscribe(
            (user) => {
              //debugger;
              this.userNames.push(user.email)
            }
          )
          
        })
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

  onSubmit(comment: string): void{
    //debugger;
    this.addComment.comment = comment;
    this.addComment.userId = this.getUser.id;
    //console.log(JSON.stringify(this.addComment))
    this.commentService.SubmitComment(this.addComment).subscribe();
    document.getElementById("commentStatus")!.innerHTML = "comment submitted successfully! Please refresh to see your comment"; 
    //console.log("button was pressed")
    };
}
