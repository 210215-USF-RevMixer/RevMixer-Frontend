import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { asyncData } from '../../testHelpers/observables';
import { SavedProjectRestService } from './saved-project-rest.service';
import { SavedProject } from '../Models/SavedProject';
import { User } from "../Models/User";

describe('SavedProjectRestService', () => {
  let service: SavedProjectRestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }
  let savedProject: SavedProject = {
    id: 1,
    projectName: "Name",
    BPM: 180,
    userProjects: [{
      id: 0,
      userId: 1,
      projectId: 1,
      owner: true,
      user: {
        id: 1,
        userName: "mads",
        email: "x@x.com",
        isAdmin: true,
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      savedProject: ([] as any)
    }], tracks: []
  }
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SavedProjectRestService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should PostUserProject', () => {
    httpClientSpy.post.and.returnValue(asyncData(savedProject));
    service.AddSavedProject(savedProject).subscribe(
      projs =>
        expect(projs).toEqual(savedProject),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });




});
