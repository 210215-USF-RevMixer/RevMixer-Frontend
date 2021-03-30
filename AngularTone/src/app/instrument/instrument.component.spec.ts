import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentComponent } from './instrument.component';

describe('InstrumentComponent', () => {
  let component: InstrumentComponent;
  let fixture: ComponentFixture<InstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change distortion', () =>
  {
    expect(component.changeDistortionAmount).toBeTruthy();
  });
  it('should change reverb decay', () =>
  {
    expect(component.changeReverbDecay).toBeTruthy();
  });
});
