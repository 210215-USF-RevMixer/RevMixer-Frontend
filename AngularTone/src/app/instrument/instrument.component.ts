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

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})

export class InstrumentComponent implements OnInit {
  tracks: { sample: any, part: any, note: any[] }[] = []
  track2Add: { sample: any, part: any, note: any[] }

  //delete this later
  testTracks: { sample: any, part: any, note: any[] }[] = []
  //delete this later

  parts: any[] = []
  isTransportStarted: boolean = false
  volume: any
  presetPatterns: any[] = []
  sampleSets: any[] = []
  samples: any[] = []

  //How many steps we have in the sequencer
  blockSize = 32
  tempo: number = 190
  //Time in the loop that matches horizontal position of the grid
  times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2",
    "0:8:0", "0:8:2", "0:9:0", "0:9:2", "0:10:0", "0:10:2", "0:11:0", "0:11:2", "0:12:0", "0:12:2", "0:13:0", "0:13:2", "0:14:0", "0:14:2", "0:15:0", "0:15:2"]

  savedPattern = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  //effects objects
  dist = new Tone.Distortion(0).toDestination()
  reverb = new Tone.Reverb(Tone.Transport.sampleTime).toDestination()
  //recording objects 
  recorder = new Tone.Recorder()
  audio: any

  constructor() {
    this.tracks = [
      {
        sample: {},
        part: {},
        note: []
      }
    ]
    this.track2Add = {
      sample: {},
      part: {},
      note: []
    }
    this.isTransportStarted = false

    //Add service to get all available presets from DB to populate
    this.presetPatterns = []
    //Add service to get all available sampleSets from DB to populate
    this.sampleSets = []
    //Add services to get all the samples from DB to populate
    this.samples = []
  }

  ngOnInit(): void {
    this.volume = new Tone.Volume(-10)

    // HARD CODED DATA FOR TESTING

    this.testTracks.push({ part: {}, sample: {}, note: [] })
    this.testTracks.push({ part: {}, sample: {}, note: [] })
    this.testTracks.push({ part: {}, sample: {}, note: [] })
    this.testTracks.push({ part: {}, sample: {}, note: [] })
    this.samples.push({sampleName: 'Kick', sample: new Tone.Sampler({
      C3: '../../assets/808/Kick.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)})
    this.samples.push({sampleName: 'Snare', sample: new Tone.Sampler({
      C3: '../../assets/808/Snare.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)})
    this.samples.push({sampleName: 'Clap', sample: new Tone.Sampler({
      C3: '../../assets/808/Clap.wav'
    }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)})

    // HARD CODED DATA FOR TESTING

    this.testTracks.forEach(testTrack => {
      for (let i = 0; i < this.blockSize; i++) {
        testTrack.note.push({
          onOff: 0,
          color: 'grey',
          position: i
        })
      }
      testTrack.sample = new Tone.Sampler({
        C3: '../../assets/808/Kick.wav'
      }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)

      for (let i = 0; i < this.blockSize; i++) {
        testTrack.part = new Tone.Part(((time) => {
          testTrack.sample.triggerAttackRelease('C3', '16n', time);
        }))
        testTrack.part.start(0);
        testTrack.part.loop = true;
        testTrack.part.loopEnd = '4m';
      }
    }
    )
    
    this.presetPatterns.push(this.testTracks)
    // HARD CODED DATA FOR TESTING

    //Creates the HTML grid, Each horizontal line holds one sample instrument, horizontal position = time position = index

    //populate each block with 32 note positions
    //change to get base track set from DB
    this.tracks.forEach(track => {
      for (let i = 0; i < this.blockSize; i++) {
        track.note.push({
          onOff: 0,
          color: 'grey',
          position: i
        })
      }
      track.sample = new Tone.Sampler({
        C3: '../../assets/808/Kick.wav'
      }).connect(this.dist).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)

      for (let i = 0; i < this.blockSize; i++) {
        track.part = new Tone.Part(((time) => {
          track.sample.triggerAttackRelease('C3', '16n', time);
        }))
        track.part.start(0);
        track.part.loop = true;
        track.part.loopEnd = '4m';
      }
    }
    )
    //Initial Tempo
    Tone.Transport.bpm.value = 190;
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
    this.isTransportStarted = !this.isTransportStarted
    Tone.Transport.toggle();
  }

  //From  HTML sliders
  tempoChange(event: any) {
    Tone.Transport.bpm.value = event.value;
  }
  changeDistortionAmount(event: any) {
    this.dist.distortion = event.value;
    //this.dist.wet = event.value;
  }
  changeReverbDecay(event: any) {
    this.reverb.decay = event.value;
  }

  //Clicking on a grid block toggles it on or off, changes color and calls update(Sample) to add or remove the note from it's track
  public changeState(currentNote: any, currentTrack: any) {
    if (this.isTransportStarted) {
      this.playStop()
    }
    if (currentNote.onOff === 0) {
      currentNote.color = 'tomato'
      currentNote.onOff = 1
      currentTrack.sample.triggerAttackRelease('C3', '16n')
      currentTrack.part.add(this.times[currentNote.position], currentTrack.sample);
    }
    else {
      currentNote.color = 'grey'
      currentNote.onOff = 0
      currentTrack.part.remove(this.times[currentNote.position]);
    }
  }

  //Turns all HTML blocks off/grey, remove all notes from all patterns
  Clear() {
    this.tracks.forEach(track => {
      track.note.forEach(note => {
        note.onOff = 0,
        note.color = 'grey'
      })
      for(let i = 0; i < this.times.length; i++)
      {
        track.part.remove(this.times[i]);
      }
    })
  }

  savePattern() {
    for (let i = 0; i < this.tracks.length; i++) {
      for (let j = 0; j < this.blockSize; j++) {
        this.savedPattern[i][j] = this.tracks[i].note[j].onOff;
      }
    }
    //save this.tracks in the DB
  }

  //Preset patterns are in pattern.const.ts 
  //Preset select dropdown "Blank" sends -1, which just clears the grid
  //uniPattern[pattern number selected by HTML][sample instrument track/vertical line position][time/horizontal block position]
  loadPattern(pattern2Load: any) {
    this.tracks = pattern2Load
  }

  //Erases all sampler instruments and recreates them from samples in assets folder
  changeSampleSet(sample2Select: any) {
    this.tracks.forEach(track => {
      track.sample = sample2Select.sample
      track.part = sample2Select.part
      track.note = sample2Select.note
    })
  }

  deleteTrack(track2Delete: any)
  {
    let filteredTracks = this.tracks.filter(t => t !== track2Delete)
    this.tracks.forEach(track => {
      if(track === track2Delete)
      {
        track.part.dispose()
      }
    })
    this.tracks = filteredTracks
  }

  addTrack(sample2Add: any)
  {
    this.track2Add.sample = sample2Add.sample
    for (let i = 0; i < this.blockSize; i++) {
      this.track2Add.note.push({
        onOff: 0,
        color: 'grey',
        position: i
      })
    }
    for (let i = 0; i < this.blockSize; i++) {
      this.track2Add.part = new Tone.Part(((time) => {
        sample2Add.sample.triggerAttackRelease('C3', '16n', time);
      }))
      this.track2Add.part.start(0);
      this.track2Add.part.loop = true;
      this.track2Add.part.loopEnd = '4m';
    }
    this.tracks.push(this.track2Add)

    this.track2Add = {sample: {}, part: {}, note: []}
  }

  playSound(sample2Add: any){
    sample2Add.sample.triggerAttackRelease('C3', '16n');
  }
}