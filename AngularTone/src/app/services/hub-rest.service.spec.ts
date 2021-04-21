import { asyncData } from '../../testHelpers/observables';

import { TestBed, inject } from '@angular/core/testing';

import { HubRestService } from './hub-rest.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UploadMusic } from '../Models/UploadMusic';
import { User } from '../Models/User';
 

describe('HubRestService', () => {
  let service: HubRestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = TestBed.inject(HubRestService);
  });

  it('GetAllUpload should return any Observable ', () => {
    service.GetAllUpload().subscribe(result => {
          expect(result instanceof Object).toBeTruthy();
    } );
 });

 
 it('AddLike should return comment ', () => {
  let user: User = {id: 1,
    userName: 'string',
    email: 'string',
    role: '',
    userProjects: [],
    sample: [],
    comments: [],
    uploadMusics: [],
    playlists: []};
   let uploadMusic: UploadMusic =
   {
     user : user,
     id: 1,
    userId: 1,
    musicFilePath: 'string',
    name: '',
    uploadDate: new Date(),
    likes : 1,
    plays : 1,
    isPrivate: false,
    musicPlaylists : [], 
    comments : []
  };

   service.AddLike(uploadMusic).subscribe(result => {
     expect (result instanceof (Object )). toBeTruthy();
     expect(result.musicFilePath).toEqual(uploadMusic.musicFilePath);
   });
 }); 

  // it(
  //   'should get uploaded music',
  //   inject(
  //     [HttpTestingController, HubRestService],
  //     (httpMock: HttpTestingController, hubRestService: HubRestService) => {
  //       const mockUploads = [
  //         { name: 'Upload1', likes: 1 },
  //         { name: 'Upload2', likes: 0 }
  //       ];
  //       hubRestService.GetAllUpload().subscribe((event: HttpEvent<any>) => {
  //         switch (event.type) {
  //           case HttpEventType.Response:
  //             expect(event.body).toEqual(mockUploads);
  //         }
  //       });

  //       const mockReq = httpMock.expectOne(hubRestService.url);

  //       expect(mockReq.cancelled).toBeFalsy();
  //       expect(mockReq.request.responseType).toEqual('json');
  //       mockReq.flush(mockUploads);

  //       httpMock.verify();
  //     }
  //   ));
  //   it(
  //     'should add like to music',
  //     inject(
  //       [HttpTestingController, HubRestService],
  //       (httpMock: HttpTestingController, hubRestService: HubRestService) => {
  //         const mockUser = {id: 1, userName: "user", email: "user@emai.com",
  //       isAdmin: false, userProjects: [], sample: [], comments: [],
  //     uploadMusics: [], playlists: []};
  //         //ICollection<List> mockComments = new List();
  //         const testDate: Date = new Date();
  //         let mockLike = { id: 1, userId: 1, musicFilePath: "test",
  //         name: 'Upload1', uploadDate: testDate, likes: 1, plays: 1,
  //       isPrivate: false, user: mockUser, musicPlaylists: [], comments: []};
  //         hubRestService.AddLike(mockLike).subscribe((event: HttpClientTestingModule) => {
  //           switch (event) {
  //             case HttpEventType.Response:
  //               expect(event).toEqual(2);
  //           }
  //         });
  
  //         const mockReq = httpMock.expectOne(`${hubRestService.url}/${mockLike.likes}`);
  
  //         expect(mockReq.cancelled).toBeFalsy();
  //         expect(mockReq.request.responseType).toEqual('json');
  //         mockReq.flush(mockLike);
  
  //         httpMock.verify();
  //       }
  //     ));
});