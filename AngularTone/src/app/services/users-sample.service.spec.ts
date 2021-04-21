import { TestBed } from '@angular/core/testing';

import { UsersSampleService } from './users-sample.service';
import { asyncData } from '../../testHelpers/observables';

describe('UsersSampleService', () => {
  let service: UsersSampleService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new UsersSampleService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

  it('should Get all user samples by id', () => {
    const expectedSamples = [{ Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} }];
    httpClientSpy.get.and.returnValue(asyncData(expectedSamples));
    service.GetUsersSampleById(0).subscribe(
      projs =>
        expect(projs).toEqual(expectedSamples),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should Get all user samples by user id', () => {
    const expectedSamples = [{ Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} }];
    httpClientSpy.get.and.returnValue(asyncData(expectedSamples));
    service.GetUsersSampleByUserId(0).subscribe(
      projs =>
        expect(projs).toEqual(expectedSamples),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should add usersamples', () => {
    const expectedSamples = { Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} };
    httpClientSpy.post.and.returnValue(asyncData(expectedSamples));
    service.AddUsersSample(expectedSamples).subscribe(
      projs =>
        expect(projs).toEqual(expectedSamples),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });

  it('should Get all usersamples', () => {
    const expectedSamples = [{ Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} }];
    httpClientSpy.get.and.returnValue(asyncData(expectedSamples));
    service.GetAllUsersSample().subscribe(
      projs =>
        expect(projs).toEqual(expectedSamples),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });


});
