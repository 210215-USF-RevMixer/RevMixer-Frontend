import { TestBed } from '@angular/core/testing';

import { ToneRESTService } from './tone-rest.service';

describe('ToneRESTService', () => {
  let service: ToneRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToneRESTService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
