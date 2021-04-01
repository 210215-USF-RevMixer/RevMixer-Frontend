import { TestBed } from '@angular/core/testing';

import { UploadedMusicRestService } from './uploaded-music-rest.service';

describe('UploadedMusicRestService', () => {
  let service: UploadedMusicRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadedMusicRestService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
