import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmusicComponent } from './adminmusic.component';

import { UserRestService } from 'src/app/services/user-rest.service';

import { AuthService } from '@auth0/auth0-angular';

describe('AdminmusicComponent', () => {
  let component: AdminmusicComponent;
  let fixture: ComponentFixture<AdminmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new AdminmusicComponent(httpClient as any, UserRestService as any, AuthService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});