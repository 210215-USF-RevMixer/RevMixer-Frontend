import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlider } from '@angular/material/slider';
import { NavbarComponent } from '../Components/shared/navbar/navbar.component';
import { InstrumentComponent } from './instrument.component';
import { MatRippleModule } from '@angular/material/core';


describe('InstrumentComponent', () => {
  let component: InstrumentComponent;
  let fixture: ComponentFixture<InstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentComponent, MatSlider, NavbarComponent, MatOption ], 
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
