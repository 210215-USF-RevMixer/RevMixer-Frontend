import { TestBed } from '@angular/core/testing';

import { MusicPlaylistRestService } from './music-playlist-rest.service';

describe('MusicPlaylistRestService', () => {
  let service: MusicPlaylistRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicPlaylistRestService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
