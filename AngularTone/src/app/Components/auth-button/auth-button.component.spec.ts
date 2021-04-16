import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonComponent } from './auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { By } from '@angular/platform-browser';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should show as Log out or Log in at the appropriate time', () => {
  //   const btn = fixture.debugElement.query(By.css('.btn')).nativeElement;

  //   if(auth.isAuthenticated$)
  //   {
  //     expect(btn.innerHTML).toContain('Log out');
  //   }
  //   else
  //   {
  //     expect(btn.innerHTML).toContain('Log in')
  //   }
  // });
});
