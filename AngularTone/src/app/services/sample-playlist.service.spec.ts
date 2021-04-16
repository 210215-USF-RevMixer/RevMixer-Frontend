import { TestBed } from '@angular/core/testing';

import { SamplePlaylistService } from './sample-playlist.service';

describe('SamplePlaylistService', () => {
  let service: SamplePlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplePlaylistService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
