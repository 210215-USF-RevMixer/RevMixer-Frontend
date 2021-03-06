
import { TestBed, inject } from '@angular/core/testing';

import { UploadedMusicRestService } from './uploaded-music-rest.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientModule } from '@angular/common/http';
describe('UploadedMusicRestService', () => {
  let service: UploadedMusicRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(UploadedMusicRestService);

  });
  it(
    'should get uploaded music',
    inject(
      [HttpTestingController, UploadedMusicRestService],
      (httpMock: HttpTestingController, uploadedMusicRestService: UploadedMusicRestService) => {
        const mockUploads = [
          { name: 'Upload1' },
          { name: 'Upload2' }
        ];
        uploadedMusicRestService.GetUploadedSongs().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockUploads);
          }
        });

        const mockReq = httpMock.expectOne(uploadedMusicRestService.url);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUploads);

        httpMock.verify();
      }
    ));
    it(
      'should get songs by user',
      inject(
        [HttpTestingController, UploadedMusicRestService],
        (httpMock: HttpTestingController, uploadedMusicRestService: UploadedMusicRestService) => {
          const mockUploads = [
            { id: 1, name: 'Upload1' , userid: 1},
            { id: 2, name: 'Upload2', userid: 2}
          ];
          uploadedMusicRestService.GetSongsByUserId(1).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                console.log(event.body)
                expect(event.body).toBe(mockUploads);
            }
          });
  
          const mockReq = httpMock.expectOne(`${uploadedMusicRestService.url}/User/${1}`);
  
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockUploads);
  
          httpMock.verify();
        }
      ));
      it(
        'should post song',
        inject(
          [HttpTestingController, UploadedMusicRestService],
          (httpMock: HttpTestingController, uploadedMusicRestService: UploadedMusicRestService) => {
            const mockUpload = { name: 'Upload1' };
            uploadedMusicRestService.PostSong(mockUpload).subscribe((event: HttpClientTestingModule) => {
              switch (event) {
                case HttpEventType.Response:
                  expect(event).toEqual(mockUpload);
              }
            });
    
            const mockReq = httpMock.expectOne(uploadedMusicRestService.url);
    
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            mockReq.flush(mockUpload);
    
            httpMock.verify();
          }
        ));
});
