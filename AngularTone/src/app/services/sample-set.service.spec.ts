import { TestBed } from '@angular/core/testing';

import { SampleSetService } from './sample-set.service';

describe('SampleSetService', () => {
  let service: SampleSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
