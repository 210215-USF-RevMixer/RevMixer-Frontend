import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminrightsComponent } from './adminrights.component';
import { SampleService } from 'src/app/services/sample.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import { AuthService } from '@auth0/auth0-angular';

describe('AdminrightsComponent', () => {
  let component: AdminrightsComponent;
  let fixture: ComponentFixture<AdminrightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminrightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new AdminrightsComponent(UserRestService as any, AuthService as any, UploadedMusicRestService as any, SampleService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});