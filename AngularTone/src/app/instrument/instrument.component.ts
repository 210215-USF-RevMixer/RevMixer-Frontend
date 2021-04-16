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
import { AuthService } from '@auth0/auth0-angular';
import * as Tone from 'tone';
import { UserRestService } from '../services/user-rest.service';
import { environment } from 'src/environments/environment';
import { SampleService } from '../services/sample.service';
import { UsersSampleService } from '../services/users-sample.service';
import { UsersSampleSetsService } from '../services/users-sample-sets.service';
@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})

export class InstrumentComponent implements OnInit {
  mouseIsClicked: boolean = false
  paddingForTopBar: string = '56px'
  popOutDisplay: string = 'none'
  tracks: { sample: any, part: any, note: any[] }[] = []
  track2Add: { sample: any, part: any, note: any[] }

  parts: any[] = []
  isTransportStarted: boolean = false
  savedProjects: any[]
  sampleSets: any[]
  samples: any[]
  tracks2Add: any[] = []
  currentTimePosition: number = 0;
  boxColor: string = 'tomato'
  tempTarget: any
  tempSoloedTrack: any

  //How many steps we have in the sequencer
  blockSize = 32
  tempo: number = 120
  //Time in the loop that matches horizontal position of the grid
  times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2",
    "0:8:0", "0:8:2", "0:9:0", "0:9:2", "0:10:0", "0:10:2", "0:11:0", "0:11:2", "0:12:0", "0:12:2", "0:13:0", "0:13:2", "0:14:0", "0:14:2", "0:15:0", "0:15:2"]

  savedProject: number[][] = []
  //effects objects
  
  autoWah = new Tone.AutoWah(50, 6, 0)
  bitcrush2: any = new Tone.BitCrusher(1.5)
  bitcrush1: any = new Tone.BitCrusher(1)
  cheby = new Tone.Chebyshev(2)
  pitchshift: any = new Tone.PitchShift(0)
  reverb: any = new Tone.Reverb(Tone.Transport.sampleTime)//.toDestination()
  volume: any = new Tone.Volume(0)//.toDestination()
  comp: any = new Tone.Compressor(-30, 20)
  dist: any = new Tone.Distortion(0)
  effects: any[] = []
  //recording objects 
  recorder = new Tone.Recorder()
  audio: any
  showDistortion: boolean = true
  showReverb: boolean = false
  showAutoWah: boolean = false
  showPitchShift: boolean = false
  showBitCrush: boolean = false
  showCheby: boolean = false

  constructor(private usersSampleService: UsersSampleService, private sampleService: SampleService, private userSampleSetService: UsersSampleSetsService, private authService: AuthService, private userService: UserRestService) {
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
    this.savedProjects = []
    this.sampleSets = []
    this.samples = []
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      authUser =>
        this.userService.GetUserByEmail(authUser.email).subscribe
          (
            foundUser => {
              this.userSampleSetService.GetUsersSampleSetByUserId(foundUser.userID).subscribe(
                userSampleSets => {
                  for (let i = 0; i < userSampleSets.length; i++) {
                    this.userSampleSetService.GetUsersSampleSetById(userSampleSets[i].sampleSetsId).subscribe(
                      currentSampleSet => {
                        this.sampleSets.push(currentSampleSet)
                        const proxyUrl = "https://cors.bridged.cc/"
                        var tempSampleSet = []
                        for (let i = 0; i < currentSampleSet.samples.length; i++) {
                          let tempSample = {
                            sampleName: currentSampleSet.samples[i].sampleName,
                            sample: new Tone.Sampler({
                              C3: `${proxyUrl}${environment.SAMPLE_STORAGE}/${currentSampleSet.samples[i].sampleLink}`
                            }).connect(this.dist).connect(this.volume).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)
                          }
                          tempSampleSet.push(tempSample)
                        }
                        this.sampleSets.push(tempSampleSet)
                      }
                    )
                  }
                }
              )
              this.usersSampleService.GetUsersSampleByUserId(foundUser.userID).subscribe(
                userSamples => {
                  const proxyUrl = "https://cors.bridged.cc/"
                  for (let i = 0; i < userSamples.length; i++) {
                    this.sampleService.GetSampleByID(userSamples[i].sampleId).subscribe(
                      currentSample => {
                        let tempSample = {
                          sampleName: currentSample.sampleName,
                          sample: new Tone.Sampler({
                            C3: `${proxyUrl}${environment.SAMPLE_STORAGE}/${currentSample.sampleLink}`
                          }).connect(this.dist).connect(this.volume).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)
                        }
                        this.samples.push(tempSample)
                      }
                    )
                  }
                }
              )
            }
          )
    )
    this.onResize
    //push on the sample sets to array
    // get the arrays from services

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
      track.sample = {
        sampleName: 'BaseKick',
        sample: new Tone.Sampler({
          C3: '../../assets/808/Kick.wav'
        }).chain(this.dist, this.comp, Tone.Destination, this.recorder)//, this.recorder)//.connect(Tone.Destination)
      }//.connect(this.dist).connect(this.volume), this.dist, this.reverb

      for (let i = 0; i < this.blockSize; i++) {
        track.part = new Tone.Part(((time) => {
          track.sample.sample.triggerAttackRelease('C3', '16n', time);
        }))
        track.part.start(0);
        track.part.loop = true;
        track.part.loopEnd = '4m';
      }
    }
    )
    //Initial Tempo
    Tone.Transport.bpm.value = 80;
    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true
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
    this.updateTimePosition()
  }

  //From  HTML sliders
  changeVolume(event: any) {
    if (event.value <= -48) {
      Tone.Destination.mute = true;
    } else {
      Tone.Destination.mute = false;
      Tone.Destination.volume.rampTo(event.value, 0.01);
    }
  }

  changeTrackVolume(event: any, track: any) {
    if(track.part.mute == true && event.value > -48){
      this.muteTrack(track)
    }
    if(event.value <= -48) {
      track.sample.sample.volume.value = -100
      if(track.part.mute == false){
        this.muteTrack(track)
      }
    } else {
      track.sample.sample.volume.value = event.value
    }
  }

  tempoChange(event: any) {
    Tone.Transport.bpm.value = event.value;
    this.tempo = event.value
  }
  changeDistortionAmount(event: any) {
    this.dist.distortion = event.value;
  }
  changeReverbDecay(event: any) {
    this.reverb.decay = event.value;
  }
  changeAutoWahFreq(event: any) {
    this.autoWah.baseFrequency = event.value;
  }
  changeAutoWahRange(event: any) {
    this.autoWah.octaves = event.value;
  }
  changePitchShift(event: any) {
    this.pitchshift.pitch = event.value;
  }
  pitchShiftDryWet(event: any) {
    this.pitchshift.wet = event.value;
  }
  changeCheby(event: any) {
    this.cheby.order = event.value;
  }
  connectEffect(effect: any) {
    this.effects.push(effect)
    
    this.tracks.forEach(track => {
      
      track.sample.sample.disconnect(this.dist)
      track.sample.sample.chain(effect, this.dist, this.comp, Tone.Destination)
      
  //     track.sample.sample.chain( this.effects.reduce((acc, string, index, array) => { 
  //       if (index !== array.length -1) { return acc + ", " + string; }
  //     else {
  //       return acc + string }
  //     } ), this.dist, this.comp, Tone.Destination)
   })
}
  disconnectEffect(effect: any) {
    // delete this.effects[this.effects.findIndex(function (element) {
    //   return element === effect
    // })]
    
    
    this.tracks.forEach(track => {
      //
      track.sample.sample.disconnect(effect)
      track.sample.sample.connect(this.dist)
      
      // track.sample.sample.chain(this.effects.reduce((acc, string, index, array) => { 
      //   if (index !== array.length -1) { return acc + ", " + string; }
      // else {
      //   return acc + string }
      // } ), this.dist, this.comp, Tone.Destination)
  })
  }

  //Clicking on a grid block toggles it on or off, changes color and calls update(Sample) to add or remove the note from it's track
  changeState(currentNote: any, currentTrack: any) {
    if (currentNote.onOff === 0) {
      currentNote.color = this.boxColor
      currentNote.onOff = 1
      currentTrack.sample.sample.triggerAttackRelease('C3', '16n')
      currentTrack.part.add(this.times[currentNote.position], currentTrack.sample);
    }
    else {
      currentNote.color = 'grey'
      currentNote.onOff = 0
      currentTrack.part.remove(this.times[currentNote.position]);
    }
  }

  //Turns all HTML blocks off/grey, remove all notes from all projects
  Clear() {
    this.tracks.forEach(track => {
      track.note.forEach(note => {
        note.onOff = 0,
          note.color = 'grey'
      })
      for (let i = 0; i < this.times.length; i++) {
        track.part.remove(this.times[i]);
      }
    })
    if (this.isTransportStarted) {
      this.playStop()
    }
  }

  saveProject() {
    this.savedProject = []
    let tempArray = []
    for (let i = 0; i < this.tracks.length; i++) {
      for (let j = 0; j < this.blockSize; j++) {
        tempArray.push(this.tracks[i].note[j].onOff)
      }
      this.savedProject.push(tempArray)
      tempArray = []
    }
    //send pattern to DB
    console.log(this.savedProject)
  }

  loadProject(project2Load: any) {
    this.tracks = project2Load
  }

  //Erases all sampler instruments and recreates them from samples in assets folder
  changeSampleSet(sample2Select: any) {
    for (let i = 0; i < sample2Select.length; i++) {
      let tempSample = {
        sampleName: sample2Select[i],
        sample: new Tone.Sampler({
          C3: sample2Select[i]
        }).chain(this.dist, this.comp, Tone.Destination, this.recorder)//.connect(this.dist).connect(this.volume).chain(this.reverb, this.dist, Tone.Destination, this.recorder).connect(Tone.Destination)
      }
      this.addTrack(tempSample)
    }
  }
  muteTrack(track2Mute: any) {
    track2Mute.part.mute = !track2Mute.part.mute
  }

  soloTrack(track2Solo: any) {
    if (this.tempSoloedTrack == track2Solo) {
      this.tracks.forEach(track => {
        track.part.mute = !track.part.mute
      })
      track2Solo.part.mute = false
    }
    else {
      this.tracks.forEach(track => {
        track.part.mute = true
      })
      track2Solo.part.mute = false
    }
    if (this.tempSoloedTrack == track2Solo) {
      this.tempSoloedTrack = {}
    } else {
      this.tempSoloedTrack = track2Solo
    }
  }


  deleteTrack(track2Delete: any) {
    let filteredTracks = this.tracks.filter(t => t !== track2Delete)
    this.tracks.forEach(track => {
      if (track === track2Delete) {
        track.part.dispose()
      }
    })
    this.tracks = filteredTracks
  }

  addTrack(sample2Add: any) {
    this.track2Add.sample = sample2Add
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

    this.track2Add = { sample: {}, part: {}, note: [] }
  }

  playSound(sample2Add: any) {
    sample2Add.sample.triggerAttackRelease('C3', '16n');
  }

  showSamples() {
    this.popOutDisplay = 'block'
  }

  hideSamples() {
    this.popOutDisplay = 'none'
  }

  updateTimePosition() {
    let multiplier = 100
    if (window.window.innerWidth < 1720) {
      multiplier = 76
    }
    const timer = setInterval(() => {
      this.currentTimePosition = (Tone.Transport.seconds / +Tone.Transport.loopEnd) * multiplier
      if (!this.isTransportStarted) {
        clearInterval(timer)
      }
    }, 10)
  }

  changePlayTime(event: any) {
    this.currentTimePosition = event.value;
  }

  onResize() {
    this.paddingForTopBar = document.querySelector('nav')?.clientHeight + 'px'
  }

  startTracking() {
    this.mouseIsClicked = true
  }

  getTrackedPosition(event: any, currentNote: any, currentTrack: any) {
    if (this.mouseIsClicked) {
      var cX = event.clientX;
      var cY = event.clientY;
      document.querySelectorAll('.single-block').forEach(block => {
        let rect = block.getBoundingClientRect()
        if (cX >= rect.left && cX <= rect.right && cY <= rect.bottom && cY >= rect.top) {
          this.changeState(currentNote, currentTrack)
        }
      })
    }
  }

  stopTracking() {
    this.mouseIsClicked = false
  }

  changeColor(color: string, event: any) {
    if (this.tempTarget) {
      this.tempTarget.style.borderColor = '#000000'
    }
    event.target.style.borderColor = '#FFFFFF'
    this.tempTarget = event.target
    this.boxColor = color
  }

  changeEffect(effect : any) {
    this.showReverb = false
    this.showDistortion = false
    this.showAutoWah = false
    this.showPitchShift = false
    this.showBitCrush = false
    this.showCheby = false
    switch(effect.value)
    {
      case 'distortion':
        this.showDistortion = true
        break
      case 'reverb':
        this.showReverb = true
        break
      case 'autoWah':
        this.showAutoWah = true
        break   
      case 'pitchshift':
        this.showPitchShift = true
        break   
      case 'bitcrush':
        this.showBitCrush = true
        break
      case 'cheby':
        this.showCheby = true
        break    
    }
  }
}