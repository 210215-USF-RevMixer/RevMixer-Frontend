import { TestBed } from '@angular/core/testing';

import { UserRestService } from './user-rest.service';
import { asyncData } from '../../testHelpers/observables';

describe('UserRestService', () => {
  let service: UserRestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new UserRestService(httpClientSpy as any)
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should GetUser by id', () => {
    const user = {
      id: 0,
      userName: "name",
      email: "x@x.com",
      isAdmin: false,
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    };
    httpClientSpy.get.and.returnValue(asyncData(user));
    service.GetUser(0).subscribe(
      projs =>
        expect(projs).toEqual(user),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should GetUser by email', () => {
    const user = {
      id: 0,
      userName: "name",
      email: "x@x.com",
      isAdmin: false,
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    };
    httpClientSpy.get.and.returnValue(asyncData(user));
    service.GetUserByEmail("x@x.com").subscribe(
      projs =>
        expect(projs).toEqual(user),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should edit user', () => {
    const user = {
      id: 0,
      userName: "name",
      email: "x@x.com",
      role: "User",
      userProjects: [],
      sample: [],
      comments: [],
      uploadMusics: [],
      playlists: []
    };
    httpClientSpy.put.and.returnValue(asyncData(user));
    service.EditUser(user).subscribe(
      projs =>
        expect(projs).toEqual(user),
      fail);

    expect(httpClientSpy.put.calls.count()).toBe(1);

  });

});
