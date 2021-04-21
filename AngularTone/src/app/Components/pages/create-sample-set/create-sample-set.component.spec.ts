import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSampleSetComponent } from './create-sample-set.component';

import { AuthService } from '@auth0/auth0-angular';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Router } from '@angular/router';
import { UsersSampleSetsService } from 'src/app/services/users-sample-sets.service';
import { SampleSetService } from './../../../services/sample-set.service';

describe('CreateSampleSet', () => {
  let component: CreateSampleSetComponent;
  let fixture: ComponentFixture<CreateSampleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSampleSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new CreateSampleSetComponent(UsersSampleSetsService as any, UserRestService as any, AuthService as any, Router as any, SampleSetService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
