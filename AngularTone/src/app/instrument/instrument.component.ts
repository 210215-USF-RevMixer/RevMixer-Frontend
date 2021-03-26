import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import {kickPattern, snarePattern, hiHatPattern, clapPattern, uniPattern} from './patterns.const';

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
  kickTrack: any;
  hiHatSample: any;
  hiHatTrack: any;
  clapSample: any;
  clapTrack: any;
  kickBlocks: { color: string, onOff: number }[] = [];
  snareBlocks: { color: string, onOff: number }[] = [];
  hiHatBlocks: { color: string, onOff: number }[] = [];
  clapBlocks: { color: string, onOff: number }[] = [];
  blockSize = 16;
  kickLoopTrack: any;
  snareLoopTrack: any;
  hiHatLoopTrack: any;
  clapLoopTrack: any;
  tempo: number = 190;

  
  constructor() { }

  ngOnInit(): void {
    this.volume = new Tone.Volume(-10);
    this.pattern = [];
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
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
    Tone.Transport.bpm.value = 190;
    this.kickTrack = this.kickSample;
    this.kickTrack = new Tone.Part();
    this.kickTrack.add("1m", "C3")
    //Tone.Transport.start();
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

  tempoChange(event: any) {
    Tone.Transport.bpm.value = event.value;
  }

  private initializeSnareSample() {
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Snare.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeKickSample() {
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Kick.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeHiHatSample() {
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/ClosedHat.wav'
    }).chain(this.volume, Tone.Destination);
  }
  private initializeClapSample() {
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Clap.wav'
    }).chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }

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
  //load sequence
  //an instrument array -> loader  should change button color too
  //lets start with a clear all claps
  Clear() {
    for(let i = 0; i < 16; i++) {
      this.kickBlocks[i].color = 'grey';
      this.kickBlocks[i].onOff = 0;
      this.snareBlocks[i].color = 'grey';
      this.snareBlocks[i].onOff = 0;
      this.hiHatBlocks[i].color = 'grey';
      this.hiHatBlocks[i].onOff = 0;
      this.clapBlocks[i].color = 'grey';
      this.clapBlocks[i].onOff = 0;
      this.updateKick(i);
      this.updateSnare(i);
      this.updateHiHat(i);
      this.updateClap(i);
    }
    
  }

  loadPattern(x: number) {
    this.Clear();
    for(let i = 0; i < 16; i++) {
      if(uniPattern[x][0][i]) {
        this.kickBlocks[i].color = 'tomato';
        this.kickBlocks[i].onOff = 1;
        this.updateKick(i);
      }
      if(uniPattern[x][1][i]) {
        this.snareBlocks[i].color = 'tomato';
        this.snareBlocks[i].onOff = 1;
        this.updateSnare(i);
      }
      if(uniPattern[x][2][i]) {
        this.hiHatBlocks[i].color = 'tomato';
        this.hiHatBlocks[i].onOff = 1;
        this.updateHiHat(i);
      }
      if(uniPattern[x][3][i]) {
        this.clapBlocks[i].color = 'tomato';
        this.clapBlocks[i].onOff = 1;
        this.updateClap(i);
      }
    }
  }

  loadKick() { 
    for(let i = 0; i < 16; i++) {
      if(kickPattern[i] == 1) {
      this.kickBlocks[i].color = 'tomato';
      this.kickBlocks[i].onOff = 1;
      } else {
      this.kickBlocks[i].color = 'grey';
      this.kickBlocks[i].onOff = 0;
      }
      this.updateKick(i);
      }
    }
    loadSnare() {
    for(let i = 0; i < 16; i++) {
      if(snarePattern[i] == 1) {
      this.snareBlocks[i].color = 'tomato';
      this.snareBlocks[i].onOff = 1;
      } else {
      this.snareBlocks[i].color = 'grey';
      this.snareBlocks[i].onOff = 0;
      }
      this.updateSnare(i);
      }
    }
    loadHiHat() {
    for(let i = 0; i < 16; i++) {
      if(hiHatPattern[i] == 1) {
      this.hiHatBlocks[i].color = 'tomato';
      this.hiHatBlocks[i].onOff = 1;
      } else {
      this.hiHatBlocks[i].color = 'grey';
      this.hiHatBlocks[i].onOff = 0;
      }
      this.updateHiHat(i);
      }
    }
    loadClap() {
    for(let i = 0; i < 16; i++) {
      if(clapPattern[i] == 1) {
      this.clapBlocks[i].color = 'tomato';
      this.clapBlocks[i].onOff = 1;
      } else {
      this.clapBlocks[i].color = 'grey';
      this.clapBlocks[i].onOff = 0;
      }
      this.updateClap(i);
      }
    }

  

  updateKick(index: number) {
    this.kickTrack = this.kickSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.kickTrack = new Tone.Part(((time, velocity) => {
      this.kickSample.triggerAttackRelease('C3', '16n', time, this.kickBlocks[index].onOff);
    }), [{time: times[index], velocity: this.kickBlocks[index].onOff}]);
    console.log("drum: kick   time: " + times[index] + "  velocity: " + this.kickBlocks[index].onOff );
    this.playPart(this.kickTrack);
  }
  updateSnare(index: number) {
    this.snareTrack = this.snareSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.snareTrack = new Tone.Part(((time, velocity) => {
      this.snareSample.triggerAttackRelease('C3', '16n', time, this.snareBlocks[index].onOff);
    }), [{time: times[index], velocity: this.snareBlocks[index].onOff}]);
    console.log("drum: snare   time: " + times[index] + "  velocity: " + this.snareBlocks[index].onOff );
    this.playPart(this.snareTrack);
  }
  updateHiHat(index: number) {
    this.hiHatTrack = this.hiHatSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.hiHatTrack = new Tone.Part(((time, velocity) => {
      this.hiHatSample.triggerAttackRelease('C3', '16n', time, this.hiHatBlocks[index].onOff);
    }), [{time: times[index], velocity: this.hiHatBlocks[index].onOff}]);
    console.log("drum: hiHat   time: " + times[index] + "  velocity: " + this.hiHatBlocks[index].onOff );
    this.playPart(this.hiHatTrack);
  }
  updateClap(index: number) {
    this.clapTrack = this.clapSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.clapTrack = new Tone.Part(((time, velocity) => {
      this.clapSample.triggerAttackRelease('C3', '16n', time, this.clapBlocks[index].onOff);
    }), [{time: times[index], velocity: this.clapBlocks[index].onOff}]);
    console.log("drum: clap   time: " + times[index] + "  velocity: " + this.clapBlocks[index].onOff );
    this.playPart(this.clapTrack);
  }

  private playPart(part: { start: (arg0: number) => void; loop: boolean; loopEnd: string; }) {
    // if (!this.isTransportStarted) {
    //   Tone.Transport.toggle();
    //   this.isTransportStarted = true;
    //   Tone.Transport.bpm.value = 190;
    // }
   
    //Tone.Transport.bpm.value = 190;

    part.start(0);
    part.loop = true;
    part.loopEnd = '2m'; 
  }
}

