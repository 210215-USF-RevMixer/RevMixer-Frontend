import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { asyncData } from '../../testHelpers/observables';

import { MusicPlaylist } from '../Models/MusicPlaylist';
import { MusicPlaylistRestService } from './music-playlist-rest.service';
import { PlayList } from '../Models/PlayList';
import { UploadMusic } from '../Models/UploadMusic';
import { toBase64String } from '@angular/compiler/src/output/source_map';

describe('MusicPlaylistRestService', () => {
  let service: MusicPlaylistRestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }

  let mPlaylist: MusicPlaylist = {
    id: 1,
    playListId: 3,
    musicId: 3,

    playList: {} as PlayList,
    uploadMusic: {} as UploadMusic
  }
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new MusicPlaylistRestService(httpClientSpy as any)
  });

  it('should return playlists', () => {
    httpClientSpy.get.and.returnValue(asyncData([mPlaylist]));
    service.GetAllMusicPlaylists().subscribe(
      mp => expect(mp).toEqual([mPlaylist]), fail
    );

      expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should add a new playlist', () => {
    httpClientSpy.post.and.returnValue(asyncData(mPlaylist));
    service.AddMusicPlaylist(mPlaylist).subscribe(
      mp => expect(mp).toEqual(mPlaylist), fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
