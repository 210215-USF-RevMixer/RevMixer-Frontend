import { TestBed, inject } from '@angular/core/testing';

import { SampleService } from './sample.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SampleService]
    });
  });
    it(
      'should get samples by id',
      inject(
        [HttpTestingController, SampleService],
        (httpMock: HttpTestingController, sampleService: SampleService) => {
          const mockSamples = [
            { id: 1, name: 'Sample1', userID: 1},
            { id: 2, name: 'Sample2', userID: 2}
          ];
          sampleService.GetSampleByID(1).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                console.log(event.body)
                expect(event.body).toBe(mockSamples);
            }
          });
  
          const mockReq = httpMock.expectOne(`${sampleService.url}/${1}`);
  
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockSamples);
  
          httpMock.verify();
        }
      ));
      it(
        'should get samples by user id',
        inject(
          [HttpTestingController, SampleService],
          (httpMock: HttpTestingController, sampleService: SampleService) => {
            const mockSamples = [
              { id: 1, name: 'Sample1', userID: 1},
              { id: 2, name: 'Sample2', userID: 2}
            ];
            sampleService.GetSamplesByUserID(1).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Response:
                  console.log(event.body)
                  expect(event.body).toBe(mockSamples);
              }
            });
    
            const mockReq = httpMock.expectOne(`${sampleService.url}/${1}`);
    
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            mockReq.flush(mockSamples);
    
            httpMock.verify();
          }
        ));
      it(
        'should add sample',
        inject(
          [HttpTestingController, SampleService],
          (httpMock: HttpTestingController, sampleService: SampleService) => {
            const mockSample = { name: 'Sample1' };
            sampleService.AddSample(mockSample).subscribe((event: HttpClientTestingModule) => {
              switch (event) {
                case HttpEventType.Response:
                  expect(event).toEqual(mockSample);
              }
            });
    
            const mockReq = httpMock.expectOne(sampleService.url);
    
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            mockReq.flush(mockSample);
    
            httpMock.verify();
          }
        ));
});
