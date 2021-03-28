import { TestBed } from '@angular/core/testing';

import { AmazonS3ApiService } from './amazon-s3-api.service';

describe('AmazonS3ApiService', () => {
  let service: AmazonS3ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazonS3ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
