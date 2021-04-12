import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { asyncData } from '../../testHelpers/observables';

import { SampleSets } from '../Models/SampleSets';
import { User } from '../Models/User';
import { Sample } from '../Models/Sample';
import { SampleSetService } from './sample-set.service';

describe('SampleSetService', () => {
  let service: SampleSetService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }

  let sampleset: SampleSets = {
    id: 1,
    name: "string",
    userId: 2,
    isPrivate: true,

    user: {} as User,
    samples: [{}, {}, {}] as Sample[]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new SampleSetService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetAllSampleSets should return any observable', () => {
    service.GetAllSampleSets().subscribe(result => {
      expect(result instanceof Object).toBeTruthy();
    });
  });

  it('AddSampleSet should return any Observable', () => {
    let user: User = {id: 1,
      userName: 'string',
      email: 'string',
      isAdmin: false,
  
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []};

    let sampleSet : SampleSets={
      id: 1,
      name: 'string',
      userId: 1,
      isPrivate: false,
      user: user,
      samples: [],
    };
    service.AddSampleSet(sampleSet).subscribe (result =>{
      expect (result instanceof (Object )). toBeTruthy();
    });
  });

  let testID = 1;
  it('should return the proper sample set when given the id', () => {
    httpClientSpy.get.and.returnValue(asyncData(sampleset));
    service.GetSampleSet(testID).subscribe(
      ss => expect(ss).toEqual([sampleset]), fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  let testUserID = 1;
  it('should return the proper sample-set when given the UserID', () => {
    httpClientSpy.get.and.returnValue(asyncData(sampleset));
    service.GetSampleSet(testUserID).subscribe(
      ss => expect(ss).toEqual([sampleset]), fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});