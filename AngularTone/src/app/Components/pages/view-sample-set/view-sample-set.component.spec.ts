import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSampleSetComponent } from './view-sample-set.component';
import { SamplePlaylistService } from './../../../services/sample-playlist.service';
import { SampleService } from './../../../services/sample.service';
import { ActivatedRoute } from '@angular/router';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';

describe('ViewSampleSetComponent', () => {
  let component: ViewSampleSetComponent
  let fixture: ComponentFixture<ViewSampleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSampleSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new ViewSampleSetComponent(AuthService as any, UserRestService as any, SampleSetService as any, SampleService as any, ActivatedRoute as any, SamplePlaylistService as any)
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
