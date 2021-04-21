import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSampleSetsComponent } from './edit-sample-sets.component';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SampleSetService } from 'src/app/services/sample-set.service';
import { UserRestService } from 'src/app/services/user-rest.service';
describe('EditSampleSetsComponment', () => {
  let component: EditSampleSetsComponent
  let fixture: ComponentFixture<EditSampleSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSampleSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new EditSampleSetsComponent(Router as any, SampleSetService as any,
      AuthService as any, UserRestService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
