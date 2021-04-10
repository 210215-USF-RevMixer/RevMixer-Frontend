import { TestBed } from '@angular/core/testing';
import { Comments } from '../Models/Comments';
import { User } from '../Models/User';

import { CommentRestService } from './comment-rest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CommentRestService', () => {
  let service: CommentRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllComment should return observable comments ', () => {
    service.GetAllComment().subscribe(result => {
          expect(result instanceof Object).toBeTruthy();
    } );
 });


 it('SubmitComment should return comment ', () => {
   let user: User = {id: 1,
    userName: 'string',
    email: 'string',
    isAdmin: false,

    userProjects: [],
    sample: [],
    comments: [],
    uploadMusics: [],
    playlists: []};
  let newComment : Comments = { 
    id:1,
    comment: 'testComment',
    commentData:new Date(),
    userId: 1,
    uploadMusicId: 1,
    user: user,
    uploadMusic:{id: 1,
      userId: 1,
      musicFilePath: 'string',
      name: 'string',
      uploadDate:new  Date(),
      likes: 1,
      plays: 1,
      isPrivate: false,
  
      user: user,
  
      musicPlaylists: [],
      comments: []}
  };
   service.SubmitComment(newComment).subscribe(result => {
     expect (result instanceof (Object )). toBeTruthy();
     expect(result.comment).toEqual(newComment.comment);
   });
 });
});
