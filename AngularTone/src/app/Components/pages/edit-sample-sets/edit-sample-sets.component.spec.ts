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
    fixture = TestBed.createComponent(EditSampleSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
