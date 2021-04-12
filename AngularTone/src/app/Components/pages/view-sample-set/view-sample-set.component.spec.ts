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
    fixture = TestBed.createComponent(ViewSampleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
