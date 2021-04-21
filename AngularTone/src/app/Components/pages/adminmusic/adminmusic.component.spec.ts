import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmusicComponent } from './adminmusic.component';

describe('AdminmusicComponent', () => {
  let component: AdminmusicComponent;
  let fixture: ComponentFixture<AdminmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
