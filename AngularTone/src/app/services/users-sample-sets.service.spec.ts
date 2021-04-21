import { TestBed } from '@angular/core/testing';
import { asyncData } from '../../testHelpers/observables';
import { UsersSampleSetsService } from './users-sample-sets.service';

describe('UsersSampleSetsService', () => {
  let service: UsersSampleSetsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }
  let testSampleSet = {id:0,name:"mads"};
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new UsersSampleSetsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should Get All Userss samplesets', () => {
    httpClientSpy.get.and.returnValue(asyncData([testSampleSet]));
    service.GetAllUsersSampleSet().subscribe(
      projs =>
        expect(projs).toEqual([testSampleSet]),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should Get Sample sets by id', () => {
    httpClientSpy.get.and.returnValue(asyncData(testSampleSet));
    service.GetUsersSampleSetById(1).subscribe(
      projs =>
        expect(projs).toEqual(testSampleSet),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should Get Sample sets by User id', () => {
    httpClientSpy.get.and.returnValue(asyncData([testSampleSet]));
    service.GetUsersSampleSetByUserId(1).subscribe(
      projs =>
        expect(projs).toEqual([testSampleSet]),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should Add Users Sample Set', () => {
    httpClientSpy.post.and.returnValue(asyncData(testSampleSet));
    service.AddUsersSampleSet(testSampleSet).subscribe(
      projs =>
        expect(projs).toEqual(testSampleSet),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });
  
});
