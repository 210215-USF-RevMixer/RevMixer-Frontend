import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should update the message if file upload is successful', () => {
    let testFile: any;
    
    expect(component.message).toBe('');

    component.uploadFile(testFile);

    expect(component.message).toBe('Upload success.');
  });
});
