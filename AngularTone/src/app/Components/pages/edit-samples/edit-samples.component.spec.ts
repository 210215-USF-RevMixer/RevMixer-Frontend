import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSamplesComponent } from './edit-samples.component';

describe('EditSamplesComponent', () => {
  let component: EditSamplesComponent;
  let fixture: ComponentFixture<EditSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
