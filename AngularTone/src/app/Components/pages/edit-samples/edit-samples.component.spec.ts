import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSamplesComponent } from './edit-samples.component';

import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SampleService } from 'src/app/services/sample.service';
import { UserRestService } from 'src/app/services/user-rest.service';

describe('EditSamplesComponment', () => {
  let component: EditSamplesComponent
  let fixture: ComponentFixture<EditSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new EditSamplesComponent(Router as any, SampleService as any,
      AuthService as any, UserRestService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

