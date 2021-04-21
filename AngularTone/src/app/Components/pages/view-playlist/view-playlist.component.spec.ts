import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewPlaylistComponent } from './view-playlist.component';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { MusicPlaylistRestService } from 'src/app/services/music-playlist-rest.service';

describe('ViewPlaylistComponent', () => {
  let component: ViewPlaylistComponent
  let fixture: ComponentFixture<ViewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new ViewPlaylistComponent(PlaylistServiceService as any, ActivatedRoute as any,
      UploadedMusicRestService as any, MusicPlaylistRestService as any,
      Router as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
