import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongsComponent } from './edit-songs.component';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

describe('EditSongsComponment', () => {
  let component: EditSongsComponent
  let fixture: ComponentFixture<EditSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new EditSongsComponent(Router as any, UploadedMusicRestService as any,
      AuthService as any, UserRestService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
