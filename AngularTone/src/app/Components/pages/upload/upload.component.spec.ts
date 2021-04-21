import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ]
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
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    let userService: { GetUserByEmail: jasmine.Spy }
    userService = jasmine.createSpyObj('UserService', ['get']);
    let uploadmusicService: { GetUserByEmail: jasmine.Spy }
    uploadmusicService = jasmine.createSpyObj('UploadmusicService', ['get']);
    component = new UploadComponent(httpClient as any, authMock as any, userService as any, uploadmusicService as any);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should update the message if file upload is successful', () => {
    let testFile: any;
    testFile = [];
    expect(component.message).toBe('');

    component.uploadFile(testFile);

    expect(component.message).toBe('Upload success.');
  });
  */
});
