import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { asyncData } from '../../testHelpers/observables';
import { PlayList } from '../Models/PlayList';
import { User } from '../Models/User';
import { MusicPlaylist } from '../Models/MusicPlaylist';
import { PlaylistServiceService } from './playlist-service.service';


describe('PlaylistServiceService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }
  let service: PlaylistServiceService;

  let playlist: PlayList = {
    id: 0,
    userId: 1,
    name: "yo",
    user: {}as User,
    musicPlaylists: [{}, {}, {}] as MusicPlaylist[]}
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new PlaylistServiceService(httpClientSpy as any)
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });


  it('should GetAllPlaylists', () => {
    
    httpClientSpy.get.and.returnValue(asyncData([playlist]));
    service.GetAllPlaylists().subscribe(
      projs =>
        expect(projs).toEqual([playlist]),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should GetPlaylist by id', () => {

    httpClientSpy.get.and.returnValue(asyncData(playlist));
    service.GetPlaylist(0).subscribe(
      projs =>
        expect(projs).toEqual(playlist),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should AddPlaylist ', () => {

    httpClientSpy.post.and.returnValue(asyncData(playlist));
    service.AddPlaylist(playlist).subscribe(
      projs =>
        expect(projs).toEqual(playlist),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });
});
