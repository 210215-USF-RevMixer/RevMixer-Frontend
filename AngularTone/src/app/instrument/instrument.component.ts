import { Component, OnInit } from '@angular/core';
import {
  DrumPattern,
  ClapPattern
} from './notes.const';
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
  drumMachine: any;
  bassPart: any;
  noise: any;
  sampler: any;
  snareSample: any;
  snareTrack: any;
  kickSample: any;
  kickTrack: any;
  hiHatSample: any;
  hiHatTrack: any;
  clapSample: any;
  clapTrack: any;
  step: any;
  vel: any;
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
    //this.synth = new Tone.Synth().toDestination();
    this.notes = ['C3'];
    this.volume = new Tone.Volume(-10);
    this.pattern = [];
    this.initializeDrumMachine();
    this.initializeSnareSample();
    this.initializeKickSample();
    this.initializeHiHatSample();
    this.initializeClapSample();
    for (let index = 0; index < this.blockSize; index++) {
      this.kickBlocks.push({
        color: 'grey',
        state: true,
        onOff: 0
      });
    }
    for (let index = 0; index < this.blockSize; index++) {
      this.snareBlocks.push({
        color: 'grey',
        state: true,
        onOff: 0
      });
    }
    for (let index = 0; index < this.blockSize; index++) {
      this.hiHatBlocks.push({
        color: 'grey',
        state: true,
        onOff: 0
      });
    }
    for (let index = 0; index < this.blockSize; index++) {
      this.clapBlocks.push({
        color: 'grey',
        state: true,
        onOff: 0
      });
    }
  } 

  public changeStateKick(index: number) {
    this.kickBlocks[index] = (this.kickBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1
    } : {
      color: 'grey',
      state: false,
      onOff: 0
    };
  }
  public changeStateSnare(index: number) {
    this.snareBlocks[index] = (this.snareBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1
    } : {
      color: 'grey',
      state: false,
      onOff: 0
    };
  }
  public changeStateHiHat(index: number) {
    this.hiHatBlocks[index] = (this.hiHatBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1
    } : {
      color: 'grey',
      state: false,
      onOff: 0
    };
  }
  public changeStateClap(index: number) {
    this.clapBlocks[index] = (this.clapBlocks[index].color === 'grey') ?
    {
      color: 'tomato',
      state: true,
      onOff: 1
    } : {
      color: 'grey',
      state: false,
      onOff: 0
    };
  }

  updateKick(index: number) {
    this.kickLoopTrack = this.kickSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.kickLoopTrack = new Tone.Part(((time, velocity) => {
      this.kickSample.triggerAttackRelease('C3', '16n', time, this.kickBlocks[index].onOff);
    }), [{time: times[index - 1], velocity: this.kickBlocks[index].onOff}]);
    this.playPart(this.kickLoopTrack);
  }
  updateSnare(index: number) {
    this.snareLoopTrack = this.snareSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.snareLoopTrack = new Tone.Part(((time, velocity) => {
      this.snareSample.triggerAttackRelease('C3', '16n', time, this.snareBlocks[index].onOff);
    }), [{time: times[index - 1], velocity: this.snareBlocks[index].onOff}]);
    this.playPart(this.snareLoopTrack);
  }
  updateHiHat(index: number) {
    this.hiHatLoopTrack = this.snareSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.hiHatLoopTrack = new Tone.Part(((time, velocity) => {
      this.hiHatSample.triggerAttackRelease('C3', '16n', time, this.hiHatBlocks[index].onOff);
    }), [{time: times[index - 1], velocity: this.hiHatBlocks[index].onOff}]);
    this.playPart(this.hiHatLoopTrack);
  }
  updateClap(index: number) {
    this.clapLoopTrack = this.snareSample;
    var times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2"];
    this.clapLoopTrack = new Tone.Part(((time, velocity) => {
      this.clapSample.triggerAttackRelease('C3', '16n', time, this.clapBlocks[index].onOff);
    }), [{time: times[index - 1], velocity: this.clapBlocks[index].onOff}]);
    this.playPart(this.clapLoopTrack);
  }

    
  private initializeDrumMachine() {
    this.sampler = new Tone.Sampler({
      C3: '../../assets/Kick.wav',
      D3: '../../assets/Snare.wav',
      E3: '../../assets/ClosedHat.wav',
      F3: '../../assets/Clap.wav'
    }).chain(this.volume, Tone.Destination);
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

  toggleSnare() {
    if (this.snareTrack) {
      this.snareTrack.mute = !this.snareTrack.mute;
    } else {
      this.snareTrack = this.snareSample;
    this.snareTrack = new Tone.Part((time, chord) => {
      this.snareSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.snareTrack);
   }
  }
  toggleKick() {
    if (this.kickTrack) {
      this.kickTrack.mute = !this.kickTrack.mute;
    } else {
      this.kickTrack = this.kickSample;
    this.kickTrack = new Tone.Part((time, chord) => {
      this.kickSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.kickTrack);
   }
  }
  toggleHiHat() {
    if (this.hiHatTrack) {
      this.hiHatTrack.mute = !this.hiHatTrack.mute;
    } else {
      this.hiHatTrack = this.hiHatSample;
    this.hiHatTrack = new Tone.Part((time, chord) => {
      this.hiHatSample.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.hiHatTrack);
   }
  }

  toggleClap() {
    if (this.clapTrack) {
      this.clapTrack.mute = !this.clapTrack.mute;
    } else {
      this.clapTrack = this.clapSample;
    this.clapTrack = new Tone.Part((time, note) => {
      this.clapSample.triggerAttackRelease("C3", "16n", time, note.velocity );
    }, ClapPattern);
    this.playPart(this.clapTrack);
   }
 }


  playNote(note: string) {
    this.sampler.triggerAttack(note);
  }

  toggleEverything() {
    this.toggleClap();
    this.toggleHiHat();
    this.toggleKick();
    this.toggleSnare();
  }

  private playPart(part: { start: (arg0: number) => void; loop: boolean; loopEnd: string; }) {
    if (!this.isTransportStarted) {
      Tone.Transport.toggle();
      this.isTransportStarted = true;
      Tone.Transport.bpm.value = 190;
      //Tone.Transport.scheduleRepeat(this.test2, '2m');
    }

    part.start(0);
    part.loop = true;
    part.loopEnd = '2m';

    
  }

  private playSample(sampleName: string) {
    new Tone.Player({
      url: `../../assets/${sampleName}.wav`,
      autostart: true
    }).chain(this.volume, Tone.Destination);
  }

  playKick() {
    this.playSample('Kick');
  }
  playSnare() {
    this.playSample('Snare');
  }
  playClosedHat() {
    this.playSample('ClosedHat');
  }
  playClap() {
    this.playSample('Clap');
  }
}

