import { TestBed } from '@angular/core/testing';
import { asyncData } from '../../testHelpers/observables';
import { SamplePlaylistService } from './sample-playlist.service';

describe('SamplePlaylistService', () => {
  let service: SamplePlaylistService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }
  let set = [{ id: 1, sampleId: 1, sampleSetId: 1 }, { id: 2, sampleId: 1, sampleSetId: 1 }];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SamplePlaylistService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should Get sample playlists', () => {
    httpClientSpy.get.and.returnValue(asyncData(set));
    service.GetAllSamplePlaylists().subscribe(
      projs =>
        expect(projs).toEqual(set),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
 
  it('should Get sample playlist by id', () => {
    httpClientSpy.get.and.returnValue(asyncData(set[0]));
    service.GetSamplePlaylistById(1).subscribe(
      projs =>
        expect(projs).toEqual(set[0]),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
  it('should add sample playlist', () => {
    httpClientSpy.post.and.returnValue(asyncData(set[0]));
    service.AddSamplePlaylist(set[0] as any).subscribe(
      projs =>
        expect(projs).toEqual(set[0]),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });





});
