import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleHubComponent } from './sample-hub.component';

import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';



describe('SampleHubComponent', () => {
  let component: SampleHubComponent;
  let fixture: ComponentFixture<SampleHubComponent>;
  //let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleHubComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  // beforeEach(async () => {
  //   const authMock = {
  //     user$: { client: { email: 'someValue' } },
  //     auth0Client: {},
  //     configFactory: {},
  //     location: null,
  //     navigator: {},
  //     isLoadingSubject$: {},
  //     errorSubject$: {},
  //     refreshState$: {},
  //     ngUnsubscribe$: {},
  //     isLoading$: false,
  //     isAuthenticatedTrigger$: {},
  //     isAuthenticated$: {},
  //     idTokenClaims$: {},
  //     error$: {},
  //     ngOnDestroy: {},
  //     loginWithRedirect: {},
  //     loginWithPopup: {},
  //     logout: {},
  //     getAccessTokenSilently: {},
  //     getAccessTokenWithPopup: {},
  //     shouldHandleCallback: {},
  //     handleRedirectCallback: {}
  //   }

  //   let userService: { GetUserByEmail: jasmine.Spy }
  //   let sampleService: {jasmine.Spy}
  //   userService = jasmine.createSpyObj('UserRestService', ['GetUserByEmail']);
  //   sampleService = jasmine.createSpyObj('SampleService', ['GetUserByEmail']);
  //   component = new SampleHubComponent(authMock as any);
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('AddSampleToUserSamplesButtonClick', () => {
  //   const testSample = {Id: 1, sampleName: "test", sampleLink: "test", isPrivate: false, isApproved: true, isLocked: false, tracks: [] };
  //   component.AddSampleToUserSamplesButtonClick(testSample.Id);
  //   expect(testSample.Id).toEqual(1);
  // });
});
