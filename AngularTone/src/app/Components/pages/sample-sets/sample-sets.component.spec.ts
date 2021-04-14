import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetsComponent } from './sample-sets.component';

describe('SampleSetsComponent', () => {
  let component: SampleSetsComponent;
  let fixture: ComponentFixture<SampleSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
