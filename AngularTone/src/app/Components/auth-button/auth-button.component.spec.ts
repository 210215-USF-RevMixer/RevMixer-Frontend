import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonComponent } from './auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { By } from '@angular/platform-browser';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let auth: AuthService;



  beforeEach(() => {
    const authMock = {
      user$: { client: { email: 'someValue' } },
      auth0Client: {},
      configFactory: {},
      location: null,
      navigator: {},
      isLoadingSubject$: {},
      errorSubject$: {},
      refreshState$: {},
      ngUnsubscribe$: {},
      isLoading$: false,
      isAuthenticatedTrigger$: {},
      isAuthenticated$: {},
      idTokenClaims$: {},
      error$: {},
      ngOnDestroy: {},
      loginWithRedirect: {},
      loginWithPopup: {},
      logout: {},
      getAccessTokenSilently: {},
      getAccessTokenWithPopup: {},
      shouldHandleCallback: {},
      handleRedirectCallback: {}


    };
    let userService: { GetUserByEmail: jasmine.Spy }
    userService = jasmine.createSpyObj('UserRestService', ['GetUserByEmail']);
    component = new AuthButtonComponent(authMock as any, new Document());
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
