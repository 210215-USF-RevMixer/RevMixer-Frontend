import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';
import { SampleSetService } from './../../../services/sample-set.service';;
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { SampleService } from 'src/app/services/sample.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new ProfileComponent(UserRestService as any, UploadedMusicRestService as any, SampleSetService as any, UsersSampleSetsService as any, SampleService as any, AuthService as any, 
      Router as any, PlaylistServiceService as any, SampleSetService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
