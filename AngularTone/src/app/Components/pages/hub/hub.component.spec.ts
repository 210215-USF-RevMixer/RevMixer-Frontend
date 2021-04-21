import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';

import { HubComponent } from './hub.component';

describe('HubComponent', () => {
  let component: HubComponent;
  let fixture: ComponentFixture<HubComponent>;
  let auth: AuthService;

  beforeEach(async () => {
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
    }

    let userService: { GetUserByEmail: jasmine.Spy }
    userService = jasmine.createSpyObj('UserRestService', ['GetUserByEmail']);
    component = new HubComponent(authMock as any);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it ('should grab', () =>{
    
  // });
});
