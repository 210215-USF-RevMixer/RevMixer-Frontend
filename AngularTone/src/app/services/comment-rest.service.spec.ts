import { TestBed } from '@angular/core/testing';

import { CommentRestService } from './comment-rest.service';

describe('CommentRestService', () => {
  let service: CommentRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentRestService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
