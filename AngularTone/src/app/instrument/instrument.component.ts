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
  pattern: string[] = [];
  isTransportStarted: boolean = false;
  volume: any;
  clapVolume: any;
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
  blockSize = 32;
  tempo: number = 190;
  dist = new Tone.Distortion(0).toDestination();
  reverb = new Tone.Reverb(0).toDestination();
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
    this.pattern = [];
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
    this.initializeShakerSample();
    this.initializeCowbellSample();
    this.initializeClaveSample();
    this.initializeCymbalSample();
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
    Tone.Transport.bpm.value = 190;

    for (let i = 0; i < this.blockSize; i++) {
      this.kickTrack = new Tone.Part(((time, velocity) => {
      this.kickSample.triggerAttackRelease('C3', '16n', time, this.kickBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.kickTrack.start(0);
      this.kickTrack.loop = true;
      this.kickTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.snareTrack = new Tone.Part(((time, velocity) => {
      this.snareSample.triggerAttackRelease('C3', '16n', time, this.snareBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.snareTrack.start(0);
      this.snareTrack.loop = true;
      this.snareTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.hiHatTrack = new Tone.Part(((time, velocity) => {
      this.hiHatSample.triggerAttackRelease('C3', '16n', time, this.hiHatBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.hiHatTrack.start(0);
      this.hiHatTrack.loop = true;
      this.hiHatTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.clapTrack = new Tone.Part(((time, velocity) => {
      this.clapSample.triggerAttackRelease('C3', '16n', time, this.clapBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.clapTrack.start(0);
      this.clapTrack.loop = true;
      this.clapTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.shakerTrack = new Tone.Part(((time, velocity) => {
      this.shakerSample.triggerAttackRelease('C3', '16n', time, this.shakerBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.shakerTrack.start(0);
      this.shakerTrack.loop = true;
      this.shakerTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.cowbellTrack = new Tone.Part(((time, velocity) => {
      this.cowbellSample.triggerAttackRelease('C3', '16n', time, this.cowbellBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.cowbellTrack.start(0);
      this.cowbellTrack.loop = true;
      this.cowbellTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.claveTrack = new Tone.Part(((time, velocity) => {
      this.claveSample.triggerAttackRelease('C3', '16n', time, this.claveBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.claveTrack.start(0);
      this.claveTrack.loop = true;
      this.claveTrack.loopEnd = '4m';
      }
    for (let i = 0; i < this.blockSize; i++) {
      this.cymbalTrack = new Tone.Part(((time, velocity) => {
      this.cymbalSample.triggerAttackRelease('C3', '16n', time, this.cymbalBlocks[i].onOff);
      }), [{time: this.times[i], velocity: '1'}]);
      this.cymbalTrack.start(0);
      this.cymbalTrack.loop = true;
      this.cymbalTrack.loopEnd = '4m';
      }



  }

  //part.remove("0:1"); ///////////////////////////////////////////////////////////////////////////////////////

  playStop() {
    if (!this.isTransportStarted) {
      Tone.Transport.toggle();
      this.isTransportStarted = true;
    } else {
      Tone.Transport.toggle();
      this.isTransportStarted = false;
    }
  }

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
    }).connect(this.dist).connect(this.reverb);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeShakerSample() {
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/Shaker.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCowbellSample() {
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/Cowbell.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeClaveSample() {
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/Clave.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCymbalSample() {
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/Cymbal.wav'
    }).connect(this.dist).connect(this.reverb);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
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
  
  loadPattern(x: number) {
        this.Clear();
        for (let i = 0; i < this.blockSize; i++) {
          if(uniPattern[x][0][i] == 1) {
            this.changeStateKick(i);
            // this.kickBlocks[i].color = 'tomato';
            // this.kickBlocks[i].onOff = 1;
            // this.updateKick(i);
          }
          if(uniPattern[x][1][i] == 1) {
            this.changeStateSnare(i);
            // this.snareBlocks[i].color = 'tomato';
            // this.snareBlocks[i].onOff = 1;
            // this.updateSnare(i);
          }
          if(uniPattern[x][2][i] == 1 ) {
            this.changeStateHiHat(i);
            // this.hiHatBlocks[i].color = 'tomato';
            // this.hiHatBlocks[i].onOff = 1;
            // this.updateHiHat(i);
          }
          if(uniPattern[x][3][i] == 1) {
            this.changeStateClap(i);
            // this.clapBlocks[i].color = 'tomato';
            // this.clapBlocks[i].onOff = 1;
            // this.updateClap(i);
          }
          if(uniPattern[x][4][i] == 1) {
            this.changeStateShaker(i);
            // this.clapBlocks[i].color = 'tomato';
            // this.clapBlocks[i].onOff = 1;
            // this.updateClap(i);
          }
          if(uniPattern[x][5][i] == 1) {
            this.changeStateCowbell(i);
            // this.clapBlocks[i].color = 'tomato';
            // this.clapBlocks[i].onOff = 1;
            // this.updateClap(i);
          }
          if(uniPattern[x][6][i] == 1) {
            this.changeStateClave(i);
            // this.clapBlocks[i].color = 'tomato';
            // this.clapBlocks[i].onOff = 1;
            // this.updateClap(i);
          }
          if(uniPattern[x][7][i] == 1) {
            this.changeStateCymbal(i);
            // this.clapBlocks[i].color = 'tomato';
            // this.clapBlocks[i].onOff = 1;
            // this.updateClap(i);
          }
        }
      }
  
//triggerAttackRelease(note, duration, time, velocity)
  updateKick(index: number) {
    if(this.kickBlocks[index].onOff == 0) {
      this.kickTrack.remove(this.times[index]);
    } else {
    // this.newKick = new Tone.ToneEvent(this.kickSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.kickBlocks[index].onOff));
    // this.kickTrack.add(this.newKick);
    this.newKickNote = new Tone.ToneEvent(this.kickSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.kickBlocks[index].onOff));
    this.kickTrack.add(this.times[index], this.newKickNote);
    }
  }
  updateSnare(index: number) {
    if(this.snareBlocks[index].onOff == 0) {
      this.snareTrack.remove(this.times[index]);
    } else {
    // this.newSnare = new Tone.ToneEvent(this.snareSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.snareBlocks[index].onOff));
    // this.snareTrack.add(this.newSnare);
    this.newSnareNote = new Tone.ToneEvent(this.snareSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.snareBlocks[index].onOff));
    this.snareTrack.add(this.times[index], this.newSnareNote);
    }
  }
  updateHiHat(index: number) {
    if(this.hiHatBlocks[index].onOff == 0) {
      this.hiHatTrack.remove(this.times[index]);
    } else {
    // this.newHiHat = new Tone.ToneEvent(this.hiHatSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.hiHatBlocks[index].onOff));
    // this.hiHatTrack.add(this.newHiHat);
    this.newHiHatNote = new Tone.ToneEvent(this.hiHatSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.hiHatBlocks[index].onOff));
    this.hiHatTrack.add(this.times[index], this.newHiHatNote);
    }
  }
  updateClap(index: number) {
    if(this.clapBlocks[index].onOff == 0) {
      this.clapTrack.remove(this.times[index]);
    } else {
    // this.newClap = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.clapBlocks[index].onOff));
    // this.clapTrack.add(this.newClap);
    this.newClapNote = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.clapBlocks[index].onOff));
    this.clapTrack.add(this.times[index], this.newClapNote);
    }
  }
  updateShaker(index: number) {
    if(this.shakerBlocks[index].onOff == 0) {
      this.shakerTrack.remove(this.times[index]);
    } else {
    // this.newClap = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.clapBlocks[index].onOff));
    // this.clapTrack.add(this.newClap);
    this.newShakerNote = new Tone.ToneEvent(this.shakerSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.clapBlocks[index].onOff));
    this.shakerTrack.add(this.times[index], this.newShakerNote);
    }
  }
  updateCowbell(index: number) {
    if(this.cowbellBlocks[index].onOff == 0) {
      this.cowbellTrack.remove(this.times[index]);
    } else {
    // this.newClap = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.clapBlocks[index].onOff));
    // this.clapTrack.add(this.newClap);
    this.newCowbellNote = new Tone.ToneEvent(this.cowbellSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.clapBlocks[index].onOff));
    this.cowbellTrack.add(this.times[index], this.newCowbellNote);
    }
  }
  updateClave(index: number) {
    if(this.claveBlocks[index].onOff == 0) {
      this.claveTrack.remove(this.times[index]);
    } else {
    // this.newClap = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.clapBlocks[index].onOff));
    // this.clapTrack.add(this.newClap);
    this.newClaveNote = new Tone.ToneEvent(this.claveSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.clapBlocks[index].onOff));
    this.claveTrack.add(this.times[index], this.newClaveNote);
    }
  }
  updateCymbal(index: number) {
    if(this.cymbalBlocks[index].onOff == 0) {
      this.cymbalTrack.remove(this.times[index]);
    } else {
    // this.newClap = new Tone.ToneEvent(this.clapSample.triggerAttackRelease('C3', '16n', this.times[index]));//, this.clapBlocks[index].onOff));
    // this.clapTrack.add(this.newClap);
    this.newCymbalNote = new Tone.ToneEvent(this.cymbalSample.triggerAttackRelease('C3', '16n'));//, this.times[index]));//, this.clapBlocks[index].onOff));
    this.cymbalTrack.add(this.times[index], this.newCymbalNote);
    }
  }
}

