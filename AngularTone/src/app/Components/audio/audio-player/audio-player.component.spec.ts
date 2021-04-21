import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerComponent } from './audio-player.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
 // let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports : [HttpClientTestingModule], 
      declarations: [ AudioPlayerComponent ]
    });
    //.compileComponents();
    component = TestBed.inject(AudioPlayerComponent);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AudioPlayerComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
