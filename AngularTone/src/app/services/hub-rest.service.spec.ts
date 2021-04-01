import { TestBed } from '@angular/core/testing';

import { HubRestService } from './hub-rest.service';

describe('HubRestService', () => {
  let service: HubRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
