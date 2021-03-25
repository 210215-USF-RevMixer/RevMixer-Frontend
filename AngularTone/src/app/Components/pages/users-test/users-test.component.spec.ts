import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTestComponent } from './users-test.component';

describe('UsersTestComponent', () => {
  let component: UsersTestComponent;
  let fixture: ComponentFixture<UsersTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
