//Known glitches
//-Loading a pattern plays all notes at the same time, sounds like garbage, needs to not do that
//-Turning on the last note of a track increases the volume of the whole track a little, minor, but weird and it bothers me
//-Sometimes when you turn the effects sliders all the way down, some effect is still heard
//
//To do
//-Save Patterns
//-Abiltiy to swap samples
//-Load bpm along with pattern, adjust slider to new value
//
//Wishlist
//-Master volume
//-Mute/Solo buttons per track
//-Adjust volume of each track
//-Highlight current playing step column
//-Synth sections, SOUNDFONTS
//-Filter with cutoff slider, Tonejs only has filters with fixed cutoff frequency :<
//-Timer that shows how long you've been recording for
//-change note of drum samples, they sound cool repitched

import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import {uniPattern} from './patterns.const';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit {
  notes: number[] = [];
  isTransportStarted: boolean = false;
  volume: any;
  sampler: any;
  snareSample: any;
  snareTrack: any;
  kickSample: any;
  kickTrack = new Tone.Part;
  hiHatSample: any;
  hiHatTrack: any;
  clapSample: any;
  clapTrack: any;
  shakerSample: any;
  shakerTrack: any;
  cowbellSample: any;
  cowbellTrack: any;
  claveSample: any;
  claveTrack: any;
  cymbalSample: any;
  cymbalTrack: any;
  kickBlocks: { color: string, onOff: number }[] = [];
  snareBlocks: { color: string, onOff: number }[] = [];
  hiHatBlocks: { color: string, onOff: number }[] = [];
  clapBlocks: { color: string, onOff: number }[] = [];
  shakerBlocks: { color: string, onOff: number }[] = [];
  cowbellBlocks: { color: string, onOff: number }[] = [];
  claveBlocks: { color: string, onOff: number }[] = [];
  cymbalBlocks: { color: string, onOff: number }[] = [];
  //How many steps we have in the sequencer
  blockSize = 32;
  tempo: number = 190;
  dist = new Tone.Distortion(0).toDestination();
  reverb = new Tone.Reverb(0).toDestination();
  //Time in the loop that matches horizontal position of the grid
  times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2",
  "0:8:0", "0:8:2", "0:9:0", "0:9:2", "0:10:0", "0:10:2", "0:11:0", "0:11:2", "0:12:0", "0:12:2", "0:13:0", "0:13:2", "0:14:0", "0:14:2", "0:15:0", "0:15:2"];
  newKickNote: any;
  newSnareNote: any;
  newHiHatNote: any;
  newClapNote: any;
  newShakerNote: any;
  newCowbellNote: any;
  newClaveNote: any;
  newCymbalNote: any;
  
  constructor() { }

  ngOnInit(): void {
    this.volume = new Tone.Volume(-10);
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
    this.initializeShakerSample();
    this.initializeCowbellSample();
    this.initializeClaveSample();
    this.initializeCymbalSample();

    //Creates the HTML grid, Each horizontal line holds one sample instrument, horizontal position = time position = index
    for (let index = 0; index < this.blockSize; index++) {
      this.kickBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.snareBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.hiHatBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.clapBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.shakerBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.cowbellBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.claveBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.cymbalBlocks.push({ 
        color: 'grey', 
        onOff: 0 }); }

    //Initial Tempo
    Tone.Transport.bpm.value = 190;

    //Initialize every HTML grid square to a note, sets the length of the tracks loop, (blocksize = 32 blocks) = (4m = 4 measures)
    for (let i = 0; i < this.blockSize; i++) {
      this.kickTrack = new Tone.Part(((time, velocity) => {
      this.kickSample.triggerAttackRelease('C3', '16n', time, this.kickBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.kickTrack.start(0);
      this.kickTrack.loop = true;
      this.kickTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.snareTrack = new Tone.Part(((time) => {
      this.snareSample.triggerAttackRelease('C3', '16n', time, this.snareBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.snareTrack.start(0);
      this.snareTrack.loop = true;
      this.snareTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.hiHatTrack = new Tone.Part(((time) => {
      this.hiHatSample.triggerAttackRelease('C3', '16n', time, this.hiHatBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.hiHatTrack.start(0);
      this.hiHatTrack.loop = true;
      this.hiHatTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.clapTrack = new Tone.Part(((time) => {
      this.clapSample.triggerAttackRelease('C3', '16n', time, this.clapBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.clapTrack.start(0);
      this.clapTrack.loop = true;
      this.clapTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.shakerTrack = new Tone.Part(((time) => {
      this.shakerSample.triggerAttackRelease('C3', '16n', time, this.shakerBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.shakerTrack.start(0);
      this.shakerTrack.loop = true;
      this.shakerTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.cowbellTrack = new Tone.Part(((time) => {
      this.cowbellSample.triggerAttackRelease('C3', '16n', time, this.cowbellBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.cowbellTrack.start(0);
      this.cowbellTrack.loop = true;
      this.cowbellTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.claveTrack = new Tone.Part(((time) => {
      this.claveSample.triggerAttackRelease('C3', '16n', time, this.claveBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.claveTrack.start(0);
      this.claveTrack.loop = true;
      this.claveTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.cymbalTrack = new Tone.Part(((time) => {
      this.cymbalSample.triggerAttackRelease('C3', '16n', time, this.cymbalBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.cymbalTrack.start(0);
      this.cymbalTrack.loop = true;
      this.cymbalTrack.loopEnd = '4m';
      }
  }

  playStop() {
    if (!this.isTransportStarted) {
      Tone.Transport.toggle();
      this.isTransportStarted = true;
    } else {
      Tone.Transport.toggle();
      this.isTransportStarted = false;
    }
  }

  //From  HTML sliders
  tempoChange(event: any) {
    Tone.Transport.bpm.value = event.value;
  }
  changeDistortionAmount(event: any) {
    this.dist.distortion = event.value;
  }
  changeReverbDecay(event: any) {
    this.reverb.decay = event.value;
  }

  private initializeSnareSample() {
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Snare.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume, Tone.Destination);
  }
  private initializeKickSample() {
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Kick.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume, Tone.Destination);
  }
  private initializeHiHatSample() {
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/ClosedHat.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume, Tone.Destination);
  }
  private initializeClapSample() {
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Clap.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeShakerSample() {
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/Shaker.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCowbellSample() {
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/Cowbell.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeClaveSample() {
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/Clave.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCymbalSample() {
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/Cymbal.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.volume = new Tone.Volume(-20), Tone.Destination);
  }

  // const sampler = new Tone.Sampler({
  //   urls: {
  //     A1: "A1.mp3",
  //     A2: "A2.mp3",
  //   },
  //   baseUrl: "https://tonejs.github.io/audio/casio/",
  //   onload: () => {
  //     sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
  //   }
  // }).toDestination(); 

//Clicking on a grid block toggles it on or off, changes color and calls update(Sample) to add or remove the note from it's track
  public changeStateKick(index: number) {
    this.kickBlocks[index] = (this.kickBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
    
      this.updateKick(index);
    }
  public changeStateSnare(index: number) {
    this.snareBlocks[index] = (this.snareBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateSnare(index);
  }
  public changeStateHiHat(index: number) {
    this.hiHatBlocks[index] = (this.hiHatBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateHiHat(index);
  }
  public changeStateClap(index: number) {
    this.clapBlocks[index] = (this.clapBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateClap(index);
  }
  public changeStateShaker(index: number) {
    this.shakerBlocks[index] = (this.shakerBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateShaker(index);
  }
  public changeStateCowbell(index: number) {
    this.cowbellBlocks[index] = (this.cowbellBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateCowbell(index);
  }
  public changeStateClave(index: number) {
    this.claveBlocks[index] = (this.claveBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateClave(index);
  }
  public changeStateCymbal(index: number) {
    this.cymbalBlocks[index] = (this.cymbalBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      onOff: 1 } : {
      color: 'grey',
      onOff: 0 };
      this.updateCymbal(index);
  }
  
//Turns all HTML blocks off/grey, remove all notes from all patterns
  Clear() {
    for(let m = 0; m < this.blockSize; m++) {
      this.kickBlocks[m].color = 'grey';
      this.kickBlocks[m].onOff = 0;
      this.snareBlocks[m].color = 'grey';
      this.snareBlocks[m].onOff = 0;
      this.hiHatBlocks[m].color = 'grey';
      this.hiHatBlocks[m].onOff = 0;
      this.clapBlocks[m].color = 'grey';
      this.clapBlocks[m].onOff = 0;
      this.shakerBlocks[m].color = 'grey';
      this.shakerBlocks[m].onOff = 0;
      this.cowbellBlocks[m].color = 'grey';
      this.cowbellBlocks[m].onOff = 0;
      this.claveBlocks[m].color = 'grey';
      this.claveBlocks[m].onOff = 0;
      this.cymbalBlocks[m].color = 'grey';
      this.cymbalBlocks[m].onOff = 0;
      this.updateKick(m);
      this.updateSnare(m);
      this.updateHiHat(m);
      this.updateClap(m);
      this.updateShaker(m);
      this.updateCowbell(m);
      this.updateClave(m);
      this.updateCymbal(m);
    }
  }
  
  //Preset patterns are in pattern.const.ts 
  //uniPattern[pattern number selected by HTML][sample instrument track/vertical line position][time/horizontal block position]
  loadPattern(x: number) {
        this.Clear();
        for (let i = 0; i < this.blockSize; i++) {
          if(uniPattern[x][0][i] == 1) {
            this.changeStateKick(i);
          }
          if(uniPattern[x][1][i] == 1) {
            this.changeStateSnare(i);
          }
          if(uniPattern[x][2][i] == 1 ) {
            this.changeStateHiHat(i);
          }
          if(uniPattern[x][3][i] == 1) {
            this.changeStateClap(i);
          }
          if(uniPattern[x][4][i] == 1) {
            this.changeStateShaker(i);
          }
          if(uniPattern[x][5][i] == 1) {
            this.changeStateCowbell(i);
          }
          if(uniPattern[x][6][i] == 1) {
            this.changeStateClave(i);
          }
          if(uniPattern[x][7][i] == 1) {
            this.changeStateCymbal(i);
          }
        }
      }
//Adds or removes note to/from a track. index is the horizontal position/time
//triggerAttackRelease(note, duration, time, velocity)
  updateKick(index: number) {
    if(this.kickBlocks[index].onOff == 0) {
      this.kickTrack.remove(this.times[index]);
    } else {
      this.newKickNote = new Tone.ToneEvent(this.kickSample.triggerAttackRelease('C3', '16n'));
      this.kickTrack.add(this.times[index], this.newKickNote);
    }
  }
  updateSnare(index: number) {
    if(this.snareBlocks[index].onOff == 0) {
      this.snareTrack.remove(this.times[index]);
    } else {
    this.newSnareNote = new Tone.ToneEvent(this.snareSample.triggerAttackRelease('C3', '16n'));;
    this.snareTrack.add(this.times[index], this.newSnareNote);
    }
  }
  updateHiHat(index: number) {
    if(this.hiHatBlocks[index].onOff == 0) {
      this.hiHatTrack.remove(this.times[index]);
    } else {
    this.newHiHatNote = new Tone.ToneEvent(this.hiHatSample.triggerAttackRelease('C3', '16n'));;
    this.hiHatTrack.add(this.times[index], this.newHiHatNote);
    }
  }
  updateClap(index: number) {
    if(this.clapBlocks[index].onOff == 0) {
      this.clapTrack.remove(this.times[index]);
    } else {
    this.newClapNote = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n'));
    this.clapTrack.add(this.times[index], this.newClapNote);
    }
  }
  updateShaker(index: number) {
    if(this.shakerBlocks[index].onOff == 0) {
      this.shakerTrack.remove(this.times[index]);
    } else {
    this.newShakerNote = new Tone.ToneEvent(this.shakerSample.triggerAttackRelease('C3', '16n'));
    this.shakerTrack.add(this.times[index], this.newShakerNote);
    }
  }
  updateCowbell(index: number) {
    if(this.cowbellBlocks[index].onOff == 0) {
      this.cowbellTrack.remove(this.times[index]);
    } else {
    this.newCowbellNote = new Tone.ToneEvent(this.cowbellSample.triggerAttackRelease('C3', '16n'));
    this.cowbellTrack.add(this.times[index], this.newCowbellNote);
    }
  }
  updateClave(index: number) {
    if(this.claveBlocks[index].onOff == 0) {
      this.claveTrack.remove(this.times[index]);
    } else {
    this.newClaveNote = new Tone.ToneEvent(this.claveSample.triggerAttackRelease('C3', '16n'));
    this.claveTrack.add(this.times[index], this.newClaveNote);
    }
  }
  updateCymbal(index: number) {
    if(this.cymbalBlocks[index].onOff == 0) {
      this.cymbalTrack.remove(this.times[index]);
    } else {
    this.newCymbalNote = new Tone.ToneEvent(this.cymbalSample.triggerAttackRelease('C3', '16n'));
    this.cymbalTrack.add(this.times[index], this.newCymbalNote);
    }
  }
}

