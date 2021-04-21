import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetsComponent } from './sample-sets.component';
import { SampleSetService } from './../../../services/sample-set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserRestService } from 'src/app/services/user-rest.service';
import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';

describe('SampleSetsComponent', () => {
  let component: SampleSetsComponent
  let fixture: ComponentFixture<SampleSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new SampleSetsComponent(ActivatedRoute as any, UserRestService as any, AuthService as any,
      UploadedMusicRestService as any, SampleSetService as any, Router as any, UsersSampleSetsService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
