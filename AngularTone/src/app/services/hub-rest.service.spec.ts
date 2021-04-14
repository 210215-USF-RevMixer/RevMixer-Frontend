import { TestBed } from '@angular/core/testing';
import { HttpTestingController} from "@angular/common/http/testing";
import { asyncData } from '../../testHelpers/observables';

import { HubRestService } from './hub-rest.service';

describe('HubRestService', () => {
  let service: HubRestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new HubRestService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
