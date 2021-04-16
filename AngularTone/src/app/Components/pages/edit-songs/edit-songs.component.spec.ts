import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongsComponent } from './edit-songs.component';

describe('EditSongsComponent', () => {
  let component: EditSongsComponent;
  let fixture: ComponentFixture<EditSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
