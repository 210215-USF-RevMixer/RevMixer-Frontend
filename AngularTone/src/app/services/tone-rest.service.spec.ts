import { TestBed } from '@angular/core/testing';
import { User } from '../Models/User';
import { ToneRESTService } from './tone-rest.service';
import { asyncData } from '../../testHelpers/observables';

describe('ToneRESTService', () => {
  let service: ToneRESTService;
  let httpClientSpy: { get: jasmine.Spy }
  let user: User[]= [{ id: 0, userName: "mads", email:"x@x.com", isAdmin: true, userProjects: [],sample:[],comments:[], uploadMusics:[],playlists:[]}];
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ToneRESTService(httpClientSpy as any);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should Get All Users', () => {
    httpClientSpy.get.and.returnValue(asyncData(user));
    service.getAllUsers().subscribe(
      projs =>
        expect(projs).toEqual(user),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });



});
