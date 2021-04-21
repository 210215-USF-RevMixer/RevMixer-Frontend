import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { ProjectRestService } from '../services/project-rest.service';
import { SamplePlaylistService } from '../services/sample-playlist.service';
import { SampleSetService } from '../services/sample-set.service';
import { SampleService } from '../services/sample.service';
import { SavedProjectRestService } from '../services/saved-project-rest.service';
import { UserRestService } from '../services/user-rest.service';
import { UsersSampleSetsService } from '../services/users-sample-sets.service';
import { UserssampleService } from '../services/userssample.service';

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
    let httpClient: { GetUserByEmail: jasmine.Spy }
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    component = new InstrumentComponent(UserssampleService as any, SampleService as any, UsersSampleSetsService as any, 
      AuthService as any, UserRestService as any, SavedProjectRestService as any, SampleSetService as any, SamplePlaylistService as any, ProjectRestService as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change tempo', () => {
    expect(component.tempoChange).toBeTruthy();
  });

  it('should change distortion', () =>
  {
    expect(component.changeDistortionAmount).toBeTruthy();
  });
  
  it('should change reverb decay', () =>
  {
    expect(component.changeReverbDecay).toBeTruthy();
  });

  it('should change filter frequency', () => {
    expect(component.changeFilterFreq).toBeTruthy();
  });

  it('should change AutoWah Frequency', () => {
    expect(component.changeAutoWahFreq).toBeTruthy();
  });

  it('should change AutoWah Range', () => {
    expect(component.changeAutoWahRange).toBeTruthy();
  });

  it('should change Pitch Shift', () => {
    expect(component.changePitchShift).toBeTruthy();
  });

  it('should change Bit Crush', () => {
    expect(component.changeBitCrush).toBeTruthy();
  });

  it('should connect effects together', () => {
    expect(component.connectEffect).toBeTruthy();
  });

  it('should disconnect effects from each other', () => {
    expect(component.disconnectEffect).toBeTruthy();
  });

  it('should connect track effects together', () => {
    expect(component.connectTrackEffect).toBeTruthy();
  });

  it('should disconnect track effects from each other', () => {
    expect(component.disconnectTrackEffect).toBeTruthy();
  });

  it('should disconnect all effects', () => {
    expect(component.disconnectAllEffects).toBeTruthy();
  });

  it('should update block color state', () => {
    expect(component.changeState).toBeTruthy();
  });

  it('should clear all notes', () => {
    expect(component.clear).toBeTruthy();
  });

  it('should change current sample set', () => {
    expect(component.changeSampleSet).toBeTruthy();
  });

  it('should mute the current track', () => {
    expect(component.muteTrack).toBeTruthy();
  });

  it('should mute all tracks except the current one', () => {
    expect(component.soloTrack).toBeTruthy();
  });

  it('should remove the current track', () => {
    expect(component.deleteTrack).toBeTruthy();
  });

  it('should add a new track', () => {
    expect(component.addTrack).toBeTruthy();
  });
})