
import { TestBed, inject } from '@angular/core/testing';

import { UploadedMusicRestService } from './uploaded-music-rest.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('UploadedMusicRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UploadedMusicRestService]
    });
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
});