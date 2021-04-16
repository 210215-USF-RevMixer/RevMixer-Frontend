import { TestBed } from '@angular/core/testing';

import { UsersSampleSetsService } from './users-sample-sets.service';

describe('UsersSampleSetsService', () => {
  let service: UsersSampleSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersSampleSetsService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
