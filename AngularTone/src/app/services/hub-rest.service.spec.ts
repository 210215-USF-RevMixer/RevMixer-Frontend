
import { TestBed, inject } from '@angular/core/testing';

import { HubRestService } from './hub-rest.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('HubRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HubRestService]
    });
  });
  it(
    'should get uploaded music',
    inject(
      [HttpTestingController, HubRestService],
      (httpMock: HttpTestingController, hubRestService: HubRestService) => {
        const mockUploads = [
          { name: 'Upload1', likes: 1 },
          { name: 'Upload2', likes: 0 }
        ];
        hubRestService.GetAllUpload().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockUploads);
          }
        });

        const mockReq = httpMock.expectOne(hubRestService.url);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUploads);

        httpMock.verify();
      }
    ));
});