import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistComponent } from './create-playlist.component';

import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { Router } from '@angular/router';



describe('CreatePlaylistComponenent', () => {
  let component: CreatePlaylistComponent;
  let fixture: ComponentFixture<CreatePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new CreatePlaylistComponent(UserRestService as any, AuthService as any, PlaylistServiceService as any, Router as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});