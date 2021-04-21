import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { HubRestService } from 'src/app/services/hub-rest.service';

import { HubComponent } from './hub.component';

describe('HubComponment', () => {
  let component: HubComponent
  let fixture: ComponentFixture<HubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new HubComponent(HubRestService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
