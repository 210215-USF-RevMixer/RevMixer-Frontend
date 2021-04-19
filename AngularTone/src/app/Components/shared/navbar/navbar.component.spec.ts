import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from './navbar.component';
export class MockAuthService {
  public handleAuth(): void {
    return;
  }
}
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {

   // let aSpy = jasmine.createSpyObj('AuthService', []);
    // Provide the dummy/mock data to sortNumberData method.
   
    const authMock = {
      user$: {client:{email: 'someValue'} }};
    /*await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers:
        [{ provider: AuthService, useValue: authMock}]
       
    })
    .compileComponents();*/
  });

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
    //fixture = TestBed.createComponent(NavbarComponent);
    let userService = {};
    component = new NavbarComponent(authMock,userService);
    //fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
