import { TestBed } from '@angular/core/testing';

import { SavedProjectRestService } from './saved-project-rest.service';

describe('SavedProjectRestService', () => {
  let service: SavedProjectRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedProjectRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
