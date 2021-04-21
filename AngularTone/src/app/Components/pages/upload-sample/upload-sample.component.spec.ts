import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSampleComponent } from './upload-sample.component';
import { AuthService } from '@auth0/auth0-angular';
import { SampleService } from 'src/app/services/sample.service';
import { UserRestService } from 'src/app/services/user-rest.service';

describe('UploadSampleComponent', () => {
  let component: UploadSampleComponent
  let fixture: ComponentFixture<UploadSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new UploadSampleComponent(httpClient as any, AuthService as any, UserRestService as any, SampleService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
