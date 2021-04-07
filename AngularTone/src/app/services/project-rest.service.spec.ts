import { TestBed } from '@angular/core/testing';

import { ProjectRestService } from './project-rest.service';

describe('ProjectRestService', () => {
  let service: ProjectRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
