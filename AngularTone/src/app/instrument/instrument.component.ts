//Known glitches
//-Loading a pattern plays all notes at the same time, sounds like garbage, needs to not do that
//-Turning on the last note of a track increases the volume of the whole track a little, minor, but weird and it bothers me
//-Sometimes when you turn the effects sliders all the way down, some effect is still heard
//
//To do
//-Abiltiy to swap samples
//-Save/Load patterns with effects settings and bpm, adjust sliders to new value
//
//Wishlist
//-Master volume
//-Mute/Solo buttons per track
//-Adjust volume of each track
//-Highlight current playing step column
//-Synth sections, SOUNDFONTS
//-More effects and parameter sliders!
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
  savedPattern = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
  //effects objects
  dist = new Tone.Distortion(0).toDestination();
  reverb = new Tone.Reverb(0).toDestination();
  //recording objects 
  recorder = new Tone.Recorder();
  audio: any;
  
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
      //Initialize audio 
      this.audio = document.querySelector('audio');
  }

  //Record songs to audio component and allows song to be downloaded
  record() {
    if (!this.isTransportStarted) {
      this.recorder.start();
      Tone.Transport.toggle()
      this.isTransportStarted = true;
    } else {
      setTimeout(async () => {
        const recording = await this.recorder.stop();
        this.audio.src = URL.createObjectURL(recording);
      }, 2000);
      Tone.Transport.toggle();
      this.isTransportStarted = false;
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

  changeSample1() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Kick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Snare.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Hat_closed.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Claps.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/woodblock.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Tom1.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Tom2.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/MxrDrumComputer185/Tom3.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  changeSample2() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/kick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/sd.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/chh.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/clap.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/cabasa.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/cowb.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/tamb.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/Linndrum/conga.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  changeSample3() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skkick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/sksnare.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skclhat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skophat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skhitom.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/sklotom.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skclhat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/CasioSk-1/skophat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  changeSample4() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeZBass.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClaves.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClick1.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClick2.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClick3.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClick4.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeClink1.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/SergeModular/SergeWhoomp.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  changeSample5() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Kick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Snare.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/ClosedHat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Clap.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/Shaker.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/Cowbell.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/Clave.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/Cymbal.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  changeSample6() {
    this.kickSample.dispose();
    this.snareSample.dispose();
    this.hiHatSample.dispose();
    this.clapSample.dispose();
    this.shakerSample.dispose();
    this.cowbellSample.dispose();
    this.claveSample.dispose();
    this.cymbalSample.dispose();
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10bd01.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10sd08.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10rim1.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10clap.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10tamb.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10choke.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10ophat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/AlesisXR-10/XR10hiq1.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);
  }

  private initializeKickSample() {
    this.kickSample = new Tone.Sampler({
      C3: '../../assets/Kick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
    //}).connect(this.dist).connect(this.reverb).connect(this.recorder).connect(Tone.Destination);//.chain(this.volume, Tone.Destination);
  }
  private initializeSnareSample() {
    this.snareSample = new Tone.Sampler({
      C3: '../../assets/Snare.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.volume, Tone.Destination);
  }
  private initializeHiHatSample() {
    this.hiHatSample = new Tone.Sampler({
      C3: '../../assets/ClosedHat.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.volume, Tone.Destination);
  }
  private initializeClapSample() {
    this.clapSample = new Tone.Sampler({
      C3: '../../assets/Clap.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeShakerSample() {
    this.shakerSample = new Tone.Sampler({
      C3: '../../assets/Shaker.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCowbellSample() {
    this.cowbellSample = new Tone.Sampler({
      C3: '../../assets/Cowbell.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeClaveSample() {
    this.claveSample = new Tone.Sampler({
      C3: '../../assets/Clave.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
  }
  private initializeCymbalSample() {
    this.cymbalSample = new Tone.Sampler({
      C3: '../../assets/Cymbal.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination);//.connect(this.recorder);
      //}).connect(this.dist).connect(this.reverb).connect(this.recorder);//.chain(this.clapVolume = new Tone.Volume(-20), Tone.Destination);
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

  savePattern() { 
    for (let i = 0; i < this. blockSize; i++) {
      this.savedPattern[0][i] = this.kickBlocks[i].onOff;
      this.savedPattern[1][i] = this.snareBlocks[i].onOff;
      this.savedPattern[2][i] = this.hiHatBlocks[i].onOff;
      this.savedPattern[3][i] = this.clapBlocks[i].onOff;
      this.savedPattern[4][i] = this.shakerBlocks[i].onOff;
      this.savedPattern[5][i] = this.cowbellBlocks[i].onOff;
      this.savedPattern[6][i] = this.claveBlocks[i].onOff;
      this.savedPattern[7][i] = this.cymbalBlocks[i].onOff;
    }
      console.log(this.savedPattern[0][0] + " " + this.savedPattern[0][1] + " " + this.savedPattern[0][2] + " " + this.savedPattern[0][3] + " " + 
       this.savedPattern[0][4] + " " + this.savedPattern[0][5] + " " + this.savedPattern[0][6] + " " + this.savedPattern[0][7] + " " + 
       this.savedPattern[0][8] + " " + this.savedPattern[0][9] + " " + this.savedPattern[0][10] + " " + this.savedPattern[0][11] + " " + 
       this.savedPattern[0][12] + " " + this.savedPattern[0][13] + " " + this.savedPattern[0][14] + " " + this.savedPattern[0][15] + " " + 
       this.savedPattern[0][16] + " " + this.savedPattern[0][17] + " " + this.savedPattern[0][18] + " " + this.savedPattern[0][19] + " " + 
       this.savedPattern[0][20] + " " + this.savedPattern[0][21] + " " + this.savedPattern[0][22] + " " + this.savedPattern[0][23] + " " + 
       this.savedPattern[0][24] + " " + this.savedPattern[0][25] + " " + this.savedPattern[0][26] + " " + this.savedPattern[0][27] + " " + 
       this.savedPattern[0][28] + " " + this.savedPattern[0][29] + " " + this.savedPattern[0][30] + " " + this.savedPattern[0][31]);
      console.log(this.savedPattern[1][0] + " " + this.savedPattern[1][1] + " " + this.savedPattern[1][2] + " " + this.savedPattern[1][3] + " " + 
        this.savedPattern[1][4] + " " + this.savedPattern[1][5] + " " + this.savedPattern[1][6] + " " + this.savedPattern[1][7] + " " + 
        this.savedPattern[1][8] + " " + this.savedPattern[1][9] + " " + this.savedPattern[1][10] + " " + this.savedPattern[1][11] + " " + 
        this.savedPattern[1][12] + " " + this.savedPattern[1][13] + " " + this.savedPattern[1][14] + " " + this.savedPattern[1][15] + " " + 
        this.savedPattern[1][16] + " " + this.savedPattern[1][17] + " " + this.savedPattern[1][18] + " " + this.savedPattern[1][19] + " " + 
        this.savedPattern[1][20] + " " + this.savedPattern[1][21] + " " + this.savedPattern[1][22] + " " + this.savedPattern[1][23] + " " + 
        this.savedPattern[1][24] + " " + this.savedPattern[1][25] + " " + this.savedPattern[1][26] + " " + this.savedPattern[1][27] + " " + 
        this.savedPattern[1][28] + " " + this.savedPattern[1][29] + " " + this.savedPattern[1][30] + " " + this.savedPattern[1][31]);
        console.log(this.savedPattern[2][2] + " " + this.savedPattern[2][1] + " " + this.savedPattern[2][2] + " " + this.savedPattern[2][3] + " " + 
          this.savedPattern[2][4] + " " + this.savedPattern[2][5] + " " + this.savedPattern[2][6] + " " + this.savedPattern[2][7] + " " + 
          this.savedPattern[2][8] + " " + this.savedPattern[2][9] + " " + this.savedPattern[2][10] + " " + this.savedPattern[2][11] + " " + 
          this.savedPattern[2][12] + " " + this.savedPattern[2][13] + " " + this.savedPattern[2][14] + " " + this.savedPattern[2][15] + " " + 
          this.savedPattern[2][16] + " " + this.savedPattern[2][17] + " " + this.savedPattern[2][18] + " " + this.savedPattern[2][19] + " " + 
          this.savedPattern[2][20] + " " + this.savedPattern[2][21] + " " + this.savedPattern[2][22] + " " + this.savedPattern[2][23] + " " + 
          this.savedPattern[2][24] + " " + this.savedPattern[2][25] + " " + this.savedPattern[2][26] + " " + this.savedPattern[2][27] + " " + 
          this.savedPattern[2][28] + " " + this.savedPattern[2][29] + " " + this.savedPattern[2][30] + " " + this.savedPattern[2][31]);
          console.log(this.savedPattern[3][3] + " " + this.savedPattern[3][1] + " " + this.savedPattern[3][2] + " " + this.savedPattern[3][3] + " " + 
       this.savedPattern[3][4] + " " + this.savedPattern[3][5] + " " + this.savedPattern[3][6] + " " + this.savedPattern[3][7] + " " + 
       this.savedPattern[3][8] + " " + this.savedPattern[3][9] + " " + this.savedPattern[3][10] + " " + this.savedPattern[3][11] + " " + 
       this.savedPattern[3][12] + " " + this.savedPattern[3][13] + " " + this.savedPattern[3][14] + " " + this.savedPattern[3][15] + " " + 
       this.savedPattern[3][16] + " " + this.savedPattern[3][17] + " " + this.savedPattern[3][18] + " " + this.savedPattern[3][19] + " " + 
       this.savedPattern[3][20] + " " + this.savedPattern[3][21] + " " + this.savedPattern[3][22] + " " + this.savedPattern[3][23] + " " + 
       this.savedPattern[3][24] + " " + this.savedPattern[3][25] + " " + this.savedPattern[3][26] + " " + this.savedPattern[3][27] + " " + 
       this.savedPattern[3][28] + " " + this.savedPattern[3][29] + " " + this.savedPattern[3][30] + " " + this.savedPattern[3][31]);
      console.log(this.savedPattern[4][4] + " " + this.savedPattern[4][1] + " " + this.savedPattern[4][2] + " " + this.savedPattern[4][3] + " " + 
        this.savedPattern[4][4] + " " + this.savedPattern[4][5] + " " + this.savedPattern[4][6] + " " + this.savedPattern[4][7] + " " + 
        this.savedPattern[4][8] + " " + this.savedPattern[4][9] + " " + this.savedPattern[4][10] + " " + this.savedPattern[4][11] + " " + 
        this.savedPattern[4][12] + " " + this.savedPattern[4][13] + " " + this.savedPattern[4][14] + " " + this.savedPattern[4][15] + " " + 
        this.savedPattern[4][16] + " " + this.savedPattern[4][17] + " " + this.savedPattern[4][18] + " " + this.savedPattern[4][19] + " " + 
        this.savedPattern[4][20] + " " + this.savedPattern[4][21] + " " + this.savedPattern[4][22] + " " + this.savedPattern[4][23] + " " + 
        this.savedPattern[4][24] + " " + this.savedPattern[4][25] + " " + this.savedPattern[4][26] + " " + this.savedPattern[4][27] + " " + 
        this.savedPattern[4][28] + " " + this.savedPattern[4][29] + " " + this.savedPattern[4][30] + " " + this.savedPattern[4][31]);
      console.log(this.savedPattern[5][5] + " " + this.savedPattern[5][1] + " " + this.savedPattern[5][2] + " " + this.savedPattern[5][3] + " " + 
          this.savedPattern[5][4] + " " + this.savedPattern[5][5] + " " + this.savedPattern[5][6] + " " + this.savedPattern[5][7] + " " + 
          this.savedPattern[5][8] + " " + this.savedPattern[5][9] + " " + this.savedPattern[5][10] + " " + this.savedPattern[5][11] + " " + 
          this.savedPattern[5][12] + " " + this.savedPattern[5][13] + " " + this.savedPattern[5][14] + " " + this.savedPattern[5][15] + " " + 
          this.savedPattern[5][16] + " " + this.savedPattern[5][17] + " " + this.savedPattern[5][18] + " " + this.savedPattern[5][19] + " " + 
          this.savedPattern[5][20] + " " + this.savedPattern[5][21] + " " + this.savedPattern[5][22] + " " + this.savedPattern[5][23] + " " + 
          this.savedPattern[5][24] + " " + this.savedPattern[5][25] + " " + this.savedPattern[5][26] + " " + this.savedPattern[5][27] + " " + 
          this.savedPattern[5][28] + " " + this.savedPattern[5][29] + " " + this.savedPattern[5][30] + " " + this.savedPattern[5][31]);
      console.log(this.savedPattern[6][6] + " " + this.savedPattern[6][1] + " " + this.savedPattern[6][2] + " " + this.savedPattern[6][3] + " " + 
            this.savedPattern[6][4] + " " + this.savedPattern[6][5] + " " + this.savedPattern[6][6] + " " + this.savedPattern[6][7] + " " + 
            this.savedPattern[6][8] + " " + this.savedPattern[6][9] + " " + this.savedPattern[6][10] + " " + this.savedPattern[6][11] + " " + 
            this.savedPattern[6][12] + " " + this.savedPattern[6][13] + " " + this.savedPattern[6][14] + " " + this.savedPattern[6][15] + " " + 
            this.savedPattern[6][16] + " " + this.savedPattern[6][17] + " " + this.savedPattern[6][18] + " " + this.savedPattern[6][19] + " " + 
            this.savedPattern[6][20] + " " + this.savedPattern[6][21] + " " + this.savedPattern[6][22] + " " + this.savedPattern[6][23] + " " + 
            this.savedPattern[6][24] + " " + this.savedPattern[6][25] + " " + this.savedPattern[6][26] + " " + this.savedPattern[6][27] + " " + 
            this.savedPattern[6][28] + " " + this.savedPattern[6][29] + " " + this.savedPattern[6][30] + " " + this.savedPattern[6][31]);
            console.log(this.savedPattern[7][7] + " " + this.savedPattern[7][1] + " " + this.savedPattern[7][2] + " " + this.savedPattern[7][3] + " " + 
       this.savedPattern[7][4] + " " + this.savedPattern[7][5] + " " + this.savedPattern[7][6] + " " + this.savedPattern[7][7] + " " + 
       this.savedPattern[7][8] + " " + this.savedPattern[7][9] + " " + this.savedPattern[7][10] + " " + this.savedPattern[7][11] + " " + 
       this.savedPattern[7][12] + " " + this.savedPattern[7][13] + " " + this.savedPattern[7][14] + " " + this.savedPattern[7][15] + " " + 
       this.savedPattern[7][16] + " " + this.savedPattern[7][17] + " " + this.savedPattern[7][18] + " " + this.savedPattern[7][19] + " " + 
       this.savedPattern[7][20] + " " + this.savedPattern[7][21] + " " + this.savedPattern[7][22] + " " + this.savedPattern[7][23] + " " + 
       this.savedPattern[7][24] + " " + this.savedPattern[7][25] + " " + this.savedPattern[7][26] + " " + this.savedPattern[7][27] + " " + 
       this.savedPattern[7][28] + " " + this.savedPattern[7][29] + " " + this.savedPattern[7][30] + " " + this.savedPattern[7][31]);
  }

  loadSavedPattern() {
    this.Clear();
    for (let i = 0; i < this. blockSize; i++) {
      if (this.savedPattern[0][i] == 1) {
        this.changeStateKick(i);
      }
      if (this.savedPattern[1][i] == 1) {
        this.changeStateSnare(i);
      }
      if (this.savedPattern[2][i] == 1) {
        this.changeStateHiHat(i);
      }
      if (this.savedPattern[3][i] == 1) {
        this.changeStateClap(i);
      }
      if (this.savedPattern[4][i] == 1) {
        this.changeStateShaker(i);
      }
      if (this.savedPattern[5][i] == 1) {
        this.changeStateCowbell(i);
      }
      if (this.savedPattern[6][i] == 1) {
        this.changeStateClave(i);
      }
      if (this.savedPattern[7][i] == 1) {
        this.changeStateCymbal(i);
      }
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

