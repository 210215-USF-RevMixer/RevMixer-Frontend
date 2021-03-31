import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from 'src/app/Models/Comments';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { User } from 'src/app/Models/User';
import { CommentRestService } from 'src/app/services/comment-rest.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: Comments[];
  addComment: Comments;
  
  constructor(private commentService: CommentRestService) {
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
    Id: 1,
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

  }


  ngOnInit(): void {
    this.commentService.GetAllComment().subscribe
    (
      foundUser =>
      {
        this.comment = foundUser;
      }
    )
    debugger;
  }

  onSubmit(): void{
    this.commentService.SubmitComment(this.addComment).subscribe(
      (addComment) =>
      {
        alert(`${addComment.comment} was added!`);
      }
    )
    console.log("button was pressed")
    };
}
