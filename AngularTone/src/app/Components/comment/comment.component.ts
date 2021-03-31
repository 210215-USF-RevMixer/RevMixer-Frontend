import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from 'src/app/Models/Comments';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { CommentRestService } from 'src/app/services/comment-rest.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: Comments[];
  upload: UploadMusic;
  addComment: Comments;
  
  constructor(private commentService: CommentRestService, private router: Router) {
  this.comment =[
  {
    id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
    uploadMusicId: 0,
    
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
  this.upload =
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

  this.addComment = 
  {
    id: 0,
    comment: '',
    commentData: new Date,
    userId: 0,
    uploadMusicId: 0,
    
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
  }

  GetComments(uploadid: number)
  {
    this.commentService.GetAllComments(uploadid).subscribe
  }


  // SubmitComment()
  // {
  //   this.commentService.SubmitComment().subscribe
  //   (data => {
  //     this.comments.push();
  //   })
  // }

  AddComment(): void{
    this.commentService.SubmitComment(this.addComment).subscribe(
      (Comments) =>
      {
        alert(`${this.addComment.comment} was added!`);
      }
    )
    console.log("button was pressed")
    };
}
