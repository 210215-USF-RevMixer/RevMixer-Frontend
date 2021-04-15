import { TestBed } from '@angular/core/testing';

import { UserssampleService } from './userssample.service';

describe('UserssampleService', () => {
  let service: UserssampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserssampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
