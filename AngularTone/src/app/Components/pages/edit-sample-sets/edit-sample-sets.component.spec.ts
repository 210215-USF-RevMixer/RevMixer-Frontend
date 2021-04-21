import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSampleSetsComponent } from './edit-sample-sets.component';

describe('EditSampleSetsComponent', () => {
  let component: EditSampleSetsComponent;
  let fixture: ComponentFixture<EditSampleSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSampleSetsComponent ]
    })
    .compileComponents();
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

   
    let userService: { GetUserByEmail: jasmine.Spy }
    userService = jasmine.createSpyObj('UserRestService', ['get']);
    let sampleSetService: { GetUserByEmail: jasmine.Spy }
    sampleSetService = jasmine.createSpyObj('SampleSetService', ['get']);
    let sampleService: { GetUserByEmail: jasmine.Spy }
    sampleService = jasmine.createSpyObj('SampleService', ['get']);
    let activeRoute: { GetUserByEmail: jasmine.Spy }
    activeRoute = jasmine.createSpyObj('Router', ['get']);
   
    component = new EditSampleSetsComponent(activeRoute as any, sampleSetService as any, authMock as any, userService as any);

   // constructor(private router: Router, private sampleSetService: SampleSetService,
    //  private authService: AuthService, private userService: UserRestService)
  
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
