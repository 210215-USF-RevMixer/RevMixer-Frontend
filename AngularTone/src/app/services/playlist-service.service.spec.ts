import { TestBed } from '@angular/core/testing';

import { PlaylistServiceService } from './playlist-service.service';

describe('PlaylistServiceService', () => {
  let service: PlaylistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
