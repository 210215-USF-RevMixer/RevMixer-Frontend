import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongsComponent } from './edit-songs.component';

describe('EditSongsComponent', () => {
  let component: EditSongsComponent;
  let fixture: ComponentFixture<EditSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSongsComponent ]
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
    let musicService: { GetUserByEmail: jasmine.Spy }
    musicService = jasmine.createSpyObj('UploadedMusicRestService', ['get']);
    let activeRoute: { GetUserByEmail: jasmine.Spy }
    activeRoute = jasmine.createSpyObj('Router', ['get']);
    
    component = new EditSongsComponent(activeRoute as any, musicService as any,
       authMock as any, userService as any);
   
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
