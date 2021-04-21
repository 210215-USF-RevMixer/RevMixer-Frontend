import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSampleSetComponent } from './create-sample-set.component';

describe('CreateSampleSetComponent', () => {
  let component: CreateSampleSetComponent;
  let fixture: ComponentFixture<CreateSampleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSampleSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSampleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
