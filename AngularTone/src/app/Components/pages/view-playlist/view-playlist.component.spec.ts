import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewPlaylistComponent } from './view-playlist.component';

describe('ViewPlaylistComponent', () => {
  const fakeActivatedRoute = {
    snapshot: {
      data: {}
    } as ActivatedRoute
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ViewPlaylistComponent],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    }).compileComponents();
  }));

  // it('should create the component', () => {
  //   const fixture = TestBed.createComponent(ViewPlaylistComponent);
  //   const newInst = fixture.debugElement.componentInstance;

  //   expect(newInst).toBeTruthy();
  // });
});
