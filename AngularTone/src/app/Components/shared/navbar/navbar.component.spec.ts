import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from './navbar.component';
import { User } from 'src/app/Models/User';
import { UserRestService } from 'src/app/services/user-rest.service';
export class MockAuthService {
  public handleAuth(): void {
    return;
  }
}
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let user: User = {
    id: 0, userName: "mads",
    email:"x@x.com",
    isAdmin: false,
    userProjects:[],
    sample: [],
    comments: [],
    uploadMusics: [],
    playlists:[]
  }
 

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
    userService=jasmine.createSpyObj('UserRestService', ['GetUserByEmail']);
    component = new NavbarComponent(authMock as any, userService as any);

  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
