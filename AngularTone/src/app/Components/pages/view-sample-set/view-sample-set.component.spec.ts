import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSampleSetComponent } from './view-sample-set.component';

describe('ViewSampleSetComponent', () => {
  let component: ViewSampleSetComponent;
  let fixture: ComponentFixture<ViewSampleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSampleSetComponent ]
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
    activeRoute = jasmine.createSpyObj('ActivedRouter', ['get']);
    let samplePlaylistService: { GetUserByEmail: jasmine.Spy }
    samplePlaylistService = jasmine.createSpyObj('SamplePlaylistService', ['get']);

    component = new ViewSampleSetComponent(authMock as any, userService as any, sampleSetService as any, sampleService as any, activeRoute as any, samplePlaylistService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
