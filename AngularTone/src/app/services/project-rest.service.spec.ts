import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjectRestService } from './project-rest.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { asyncData } from '../../testHelpers/observables';


describe('ProjectRestService', () => {
  //let httpTestingController: HttpTestingController;
  let service: ProjectRestService;
  let httpClientSpy: { get: jasmine.Spy ,post:jasmine.Spy}

  let Project: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','delete']);
    service = new ProjectRestService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GetUserProjectsByUserID', () => {
    const expectedProjects = [{ Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} }];
    httpClientSpy.get.and.returnValue(asyncData(expectedProjects));
    service.GetUserProjectByID(0).subscribe(
      projs =>
        expect(projs).toEqual(expectedProjects),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should GetUserProjectsByUserID', () => {
    const expectedProjects = [{ Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} }];
    httpClientSpy.get.and.returnValue(asyncData(expectedProjects));
    service.GetUserProjectByID(0).subscribe(
      projs =>
        expect(projs).toEqual(expectedProjects),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should PostUserProject', () => {
    const postedProject :any = { Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} };
    httpClientSpy.post.and.returnValue(asyncData(postedProject));
    service.PostUserProject(postedProject).subscribe(
      projs =>
        expect(projs).toEqual(postedProject),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should EditUserProject', () => {
    const expectedProjects = { Id: 0, userId: 0, projectId: 0, owner: true, savedProject: {} };
    httpClientSpy.get.and.returnValue(asyncData(expectedProjects));
    service.GetUserProjectByID(0).subscribe(
      projs =>
        expect(projs).toEqual(expectedProjects),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });


  });


