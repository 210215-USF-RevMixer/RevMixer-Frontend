import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleHubComponent } from './sample-hub.component';

describe('SampleHubComponent', () => {
  let component: SampleHubComponent;
  let fixture: ComponentFixture<SampleHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
