import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit {
  notes: string[] = [];
  pattern: string[] = [];
  isTransportStarted: boolean = false;
  volume: any;
  sampler: any;
  snareSample: any;
  snareTrack: any;
  kickSample: any;
  kickTrack: any;
  hiHatSample: any;
  hiHatTrack: any;
  clapSample: any;
  clapTrack: any;
  kickBlocks: { color: string, state: boolean, onOff: number }[] = [];
  snareBlocks: { color: string, state: boolean, onOff: number }[] = [];
  hiHatBlocks: { color: string, state: boolean, onOff: number }[] = [];
  clapBlocks: { color: string, state: boolean, onOff: number }[] = [];
  blockSize = 16;
  kickLoopTrack: any;
  snareLoopTrack: any;
  hiHatLoopTrack: any;
  clapLoopTrack: any;

  
  constructor() { }

  ngOnInit(): void {
    this.notes = ['C3'];
    this.volume = new Tone.Volume(-10);
    this.pattern = [];
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
    for (let index = 0; index < this.blockSize; index++) {
      this.kickBlocks.push({ 
        color: 'grey', 
        state: true, 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.snareBlocks.push({ 
        color: 'grey', 
        state: true, 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.hiHatBlocks.push({ 
        color: 'grey', 
        state: true, 
        onOff: 0 }); }
    for (let index = 0; index < this.blockSize; index++) {
      this.clapBlocks.push({ 
        color: 'grey', 
        state: true, 
        onOff: 0 }); }
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
    }).chain(this.volume, Tone.Destination);
  }

  public changeStateKick(index: number) {
    this.kickBlocks[index] = (this.kickBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1 } : {
      color: 'grey',
      state: false,
      onOff: 0 };
}
  public changeStateSnare(index: number) {
    this.snareBlocks[index] = (this.snareBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1 } : {
      color: 'grey',
      state: false,
      onOff: 0 };
  }
  public changeStateHiHat(index: number) {
    this.hiHatBlocks[index] = (this.hiHatBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1 } : {
      color: 'grey',
      state: false,
      onOff: 0 };
  }
  public changeStateClap(index: number) {
    this.clapBlocks[index] = (this.clapBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1 } : {
      color: 'grey',
      state: false,
      onOff: 0 };
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
   
    Tone.Transport.bpm.value = 190;

    part.start(0);
    part.loop = true;
    part.loopEnd = '2m'; 
  }
}

