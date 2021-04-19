//
//Wishlist
//-Highlight current playing step column
//-Synth sections, SOUNDFONTS
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
import { ProjectRestService } from '../services/project-rest.service';
@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})

export class InstrumentComponent implements OnInit {
  mouseIsClicked: boolean = false
  paddingForTopBar: string = '70px'
  popOutDisplay: string = 'none'
  popOutSettings: string = 'none'
  popOutForm: string = 'none'
  tracks: { sample: any, part: any, note: any[] }[] = []
  track2Add: { sample: any, part: any, note: any[] }

  parts: any[] = []
  isTransportStarted: boolean = false
  savedProjects: any[]
  sampleSets: any[]
  samples: any[]
  tracks2Add: any[] = []
  currentTimePosition: number = 0;
  boxColor: string = '#F26925'
  tempTarget: any
  tempSoloedTrack: any
  editingTrack: any
  newSavedProject: any = {}

  //How many steps we have in the sequencer
  blockSize = 32
  tempo: number = 160
  //Time in the loop that matches horizontal position of the grid
  times = ["0:0:0", "0:0:2", "0:1:0", "0:1:2", "0:2:0", "0:2:2", "0:3:0", "0:3:2", "0:4:0", "0:4:2", "0:5:0", "0:5:2", "0:6:0", "0:6:2", "0:7:0", "0:7:2",
    "0:8:0", "0:8:2", "0:9:0", "0:9:2", "0:10:0", "0:10:2", "0:11:0", "0:11:2", "0:12:0", "0:12:2", "0:13:0", "0:13:2", "0:14:0", "0:14:2", "0:15:0", "0:15:2"]

  savedProjectPattern: number[][] = []
  //effects objects

  volume: any = new Tone.Volume(0)//.toDestination()
  autoWah = new Tone.AutoWah(47, 4, -40)
  bitcrush2: any = new Tone.BitCrusher(2)
  bitcrush1_5: any = new Tone.BitCrusher(1.5)
  bitcrush1: any = new Tone.BitCrusher(1)
  cheby = new Tone.Chebyshev(2)
  pitchshift: any = new Tone.PitchShift(0)
  reverb: any = new Tone.Reverb(Tone.Transport.sampleTime)//.toDestination()
  comp: any = new Tone.Compressor(-30, 20)
  dist: any = new Tone.Distortion(0)
  delay32: any = new Tone.FeedbackDelay("32n", 0.7)
  delay16: any = new Tone.FeedbackDelay("16n", 0.5)
  delay8: any = new Tone.FeedbackDelay("8t", 0.5)
  filter = new Tone.Filter(50, "lowpass")
  loadingSampleError: string = ''
  failedSamples: string[] = []
  effects: any[] = []
  tempBuffer: any = {}
  bits: number = 0// for keeping the place of the bitcrusher slider
  time: number = 0// for keeping the place of the delay slider
  //recording objects 
  recorder = new Tone.Recorder()
  audio: any
  showDistortion: boolean = true
  showReverb: boolean = false
  showFilter: boolean = false
  showDelay: boolean = false
  showAutoWah: boolean = false
  showPitchShift: boolean = false
  showBitCrush: boolean = false
  showCheby: boolean = false

  constructor(private usersSampleService: UsersSampleService, private sampleService: SampleService, private userSampleSetService: UsersSampleSetsService, private authService: AuthService, private userService: UserRestService, private projectRestService: ProjectRestService) {
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
              //ASSIGN USER ID FOR SAVING PROJECTS
              this.newSavedProject = {
                name: '',
                userId: foundUser.id.toString()
              }


              const proxyUrl = "https://cors.bridged.cc/"

              //GET USERS SAMPLE SETS
              this.userSampleSetService.GetUsersSampleSetByUserId(foundUser.id).subscribe(
                userSampleSets => {
                  for (let i = 0; i < userSampleSets.length; i++) {
                    this.userSampleSetService.GetUsersSampleSetById(userSampleSets[i].sampleSetsId).subscribe(
                      currentSampleSet => {
                        this.sampleSets.push(currentSampleSet)
                        var tempSampleSet = []
                        for (let i = 0; i < currentSampleSet.samples.length; i++) {
                          let tempSample = {
                            sampleName: currentSampleSet.samples[i].sampleName,
                            sample: new Tone.Sampler({
                              C3: `${proxyUrl}${environment.SAMPLE_STORAGE}/${currentSampleSet.samples[i].sampleLink}`
                            }).chain(this.dist, this.comp, Tone.Destination, this.recorder)
                          }
                          tempSampleSet.push(tempSample)
                        }
                        this.sampleSets.push(tempSampleSet)
                      }
                    )
                  }
                }
              )

              //GET USERS SAMPLES
              this.usersSampleService.GetUsersSampleByUserId(foundUser.id).pipe().subscribe(
                userSamples => {
                  for (let i = 0; i < userSamples.length; i++) {
                    this.sampleService.GetSampleByID(userSamples[i].sampleId).subscribe(
                      currentSample => {
                        const buffer = new Tone.Buffer(`${proxyUrl}${environment.SAMPLE_STORAGE}/${currentSample.sampleLink}`, () => {
                          let tempSample = {
                            id: currentSample.id,
                            sampleName: currentSample.sampleName,
                            sample: new Tone.Sampler({
                              C3: `${proxyUrl}${environment.SAMPLE_STORAGE}/${currentSample.sampleLink}`
                            }).chain(this.dist, this.comp, Tone.Destination, this.recorder)
                          }
                          this.samples.push(tempSample)
                        })
                      },
                      error => {
                        this.loadingSampleError = 'Some of your samples failed to load. :('
                        this.sampleService.GetSampleByID(userSamples[i].sampleId).subscribe(
                          failedSample => {
                            this.failedSamples.push(failedSample.sampleName)
                          }
                        )
                      }
                    )
                  }
                }
              )
            }
          )
    )
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
        id: 0,
        sampleName: 'BaseKick',
        sample: new Tone.Sampler({
          C3: '../../assets/808/Kick.wav'
        }).chain(this.dist, this.comp, Tone.Destination, this.recorder)
      }//.connect(this.dist).connect(this.volume), this.dist, this.reverb

      for (let i = 0; i < this.blockSize; i++) {
        track.part = new Tone.Part(((time) => {
          track.sample.sample.triggerAttackRelease('C3', '1m', time);
        }))
        track.part.start(0);
        track.part.loop = true;
        track.part.loopEnd = '4m';
      }
    }
    )
    //Initial Tempo
    Tone.Transport.bpm.value = 160;
    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true
    this.audio = document.querySelector('audio');
    this.autoWah.Q.value = 6
    this.autoWah.Q.value = 8
    this.filter.rolloff = -48 

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
    if (track.part.mute == true && event.value > -48) {
      this.muteTrack(track)
    }
    if (event.value <= -48) {
      track.sample.sample.volume.value = -100
      if (track.part.mute == false) {
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
    // if(event.value <= 2) {
    //   try{this.disconnectEffect(this.reverb)}catch{} 
    // }else {
    //   try{this.connectEffect(this.reverb)}catch{}
      this.reverb.decay = event.value;
    // }
  }
  changeFilterFreq(event: any) {
    this.filter.frequency.rampTo(event.value, 0.1)
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
  changeCheby(event: any) {
    // if(event.value == 1) {
    //   try{this.disconnectEffect(this.cheby)}catch{}
    // }else{
    //   try{this.connectEffect(this.cheby)}catch{}
      this.cheby.order = event.value;
    // }
  }
  changeDelayTime(event: any) {
    if(event.value == 0) {
      this.time = 0
      this.tracks.forEach(track => {
        try{track.sample.sample.disconnect(this.delay32)}catch{}
        try{track.sample.sample.disconnect(this.delay16)}catch{}
        try{track.sample.sample.disconnect(this.delay8)}catch{}       
      })
    }else
    if(event.value == 1) {
      this.time = 1
      this.tracks.forEach(track => {
        track.sample.sample.chain(this.delay32, this.dist, this.comp, Tone.Destination)
        try{track.sample.sample.disconnect(this.delay16)}catch{}
        try{track.sample.sample.disconnect(this.delay8)}catch{} 
      })
    }else
    if(event.value == 2) {
      this.time = 2
      this.tracks.forEach(track => {
        track.sample.sample.chain(this.delay16, this.dist, this.comp, Tone.Destination)
        try{track.sample.sample.disconnect(this.delay32)}catch{}
        try{track.sample.sample.disconnect(this.delay8)}catch{}
      })
    }else
    if(event.value == 3) {
      this.time = 3
      this.tracks.forEach(track => {
        track.sample.sample.chain(this.delay8, this.dist, this.comp, Tone.Destination)
        try{track.sample.sample.disconnect(this.delay16)}catch{}
        try{track.sample.sample.disconnect(this.delay32)}catch{}
      })
    }
  }

  changeBitCrush(event: any) {
    if(event.value == 0) {
      this.bits = 0
      this.tracks.forEach(track => {
        try{track.sample.sample.disconnect(this.bitcrush1)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1_5)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush2)}catch{}
        try{track.sample.sample.chain(this.dist, this.comp, Tone.Destination)}catch{}  
      })
    }else
    if(event.value == 1) {
      this.bits = 1
      this.tracks.forEach(track => {
        try{track.sample.sample.chain(this.bitcrush2, this.dist, this.comp, Tone.Destination)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1_5)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1)}catch{} 
        try{track.sample.sample.disconnect(this.dist)}catch{}
      })
    }else
    if(event.value == 2) {
      this.bits = 2
      this.tracks.forEach(track => {
        try{track.sample.sample.chain(this.bitcrush1_5, this.dist, this.comp, Tone.Destination)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush2)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1)}catch{} 
        try{track.sample.sample.disconnect(this.dist)}catch{}
      })
    }else
    if(event.value == 3) {
      this.bits = 3
      this.tracks.forEach(track => {
        try{track.sample.sample.chain(this.bitcrush1, this.dist, this.comp, Tone.Destination)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1_5)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush2)}catch{} 
        try{track.sample.sample.disconnect(this.dist)}catch{}
      })
    }
  }
  connectEffect(effect: any) {
    if(effect === this.reverb) {
        this.tracks.forEach(track => {
        try{track.sample.sample.chain(effect, this.dist, this.comp, Tone.Destination)}catch{}
      })
    }else {
      this.tracks.forEach(track => {
        try{track.sample.sample.disconnect(this.dist)}catch{}
        try{track.sample.sample.chain(effect, this.dist, this.comp, Tone.Destination)}catch{}
      })
    }
  }
  disconnectEffect(effect: any) {
    if(effect == "bitcrush") {
      this.tracks.forEach(track => { 
        try{track.sample.sample.disconnect(this.bitcrush1)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush1_5)}catch{}
        try{track.sample.sample.disconnect(this.bitcrush2)}catch{}
        try{track.sample.sample.connect(this.dist)}catch{}
      })
    } else if(effect == "delay") {
      this.tracks.forEach(track => { 
        try{track.sample.sample.disconnect(this.delay32)}catch{}
        try{track.sample.sample.disconnect(this.delay16)}catch{}
        try{track.sample.sample.disconnect(this.delay8)}catch{}
        try{track.sample.sample.connect(this.dist)}catch{}
      })
    } else {
      this.tracks.forEach(track => { 
        try{track.sample.sample.disconnect(effect)}catch{}
        try{track.sample.sample.connect(this.dist)}catch{}
      })
    }
  }

  connectTrackEffect(effect: any, track: any) {
    if(effect === this.reverb) {
    try{track.sample.sample.chain(effect, this.dist, this.comp, Tone.Destination)}catch{}
    }else {
      try{track.sample.sample.chain(effect, this.dist, this.comp, Tone.Destination)}catch{}
      try{track.sample.sample.disconnect(this.dist)}catch{}
    }
  }
  disconnectTrackEffect(effect: any, track: any) {
    try{track.sample.sample.disconnect(effect)}catch{}
    try{track.sample.sample.connect(this.dist)}catch{}
  }
  disconnectAllEffects() {
    this.tracks.forEach(track => { 
      try{track.sample.sample.disconnect(this.autoWah)}catch{}
      try{track.sample.sample.disconnect(this.bitcrush2)}catch{}
      try{track.sample.sample.disconnect(this.bitcrush1_5)}catch{}
      try{track.sample.sample.disconnect(this.bitcrush1)}catch{}
      try{track.sample.sample.disconnect(this.cheby)}catch{}
      try{track.sample.sample.disconnect(this.pitchshift)}catch{}
      try{track.sample.sample.disconnect(this.reverb)}catch{}
      try{track.sample.sample.disconnect(this.delay32)}catch{}
      try{track.sample.sample.disconnect(this.delay16)}catch{}
      try{track.sample.sample.disconnect(this.delay8)}catch{}
      try{track.sample.sample.connect(this.dist)}catch{}
    })
  }

  //Clicking on a grid block toggles it on or off, changes color and calls update(Sample) to add or remove the note from it's track
  changeState(currentNote: any, currentTrack: any) {
    if (currentNote.onOff === 0) {
      currentNote.color = this.boxColor
      currentNote.onOff = 1
      currentTrack.sample.sample.triggerAttackRelease('C3', '1m')
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
        sample2Add.sample.triggerAttackRelease('C3', '1m', time);
      }))
      this.track2Add.part.start(0);
      this.track2Add.part.loop = true;
      this.track2Add.part.loopEnd = '4m';
    }
    this.tracks.push(this.track2Add)

    this.track2Add = { sample: {}, part: {}, note: [] }
  }

  playSound(sample2Add: any) {
    sample2Add.sample.triggerAttackRelease('C3', '1m');
  }

  showSamples() {
    this.popOutDisplay = 'block'
  }

  hideSamples() {
    this.popOutDisplay = 'none'
  }

  showForm() {
    this.popOutForm = 'block'
  }

  hideForm() {
    this.popOutForm = 'none'
  }

  showTrackSettings(track : any) {
    this.popOutSettings = 'block'
    this.editingTrack = track
  }

  hideTrackSettings(){
    this.popOutSettings = 'none'
  }

  updateTimePosition() {
    let multiplier = 100
    if (window.innerWidth < 1600) {
      multiplier = 82
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

  changeEffect(effect: any) {
    this.showReverb = false
    this.showDelay = false
    this.showFilter = false
    this.showDistortion = false
    this.showAutoWah = false
    this.showPitchShift = false
    this.showBitCrush = false
    this.showCheby = false
    switch (effect.value) {
      case 'distortion':
        this.showDistortion = true
        break
      case 'reverb':
        this.showReverb = true
        break
      case 'filter':
        this.showFilter = true
        break
      case 'delay':
        this.showDelay = true
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

  createNewProject(){
    const formData = new FormData();

    this.savedProjectPattern = []
    let tempArray = []
    let tempPattern = []
    let tempSampleIds = []
    for (let i = 0; i < this.tracks.length; i++) {
      for (let j = 0; j < this.blockSize; j++) {
        tempArray.push(this.tracks[i].note[j].onOff)
      }
      tempPattern.push(tempArray.join(''))
      tempSampleIds.push(this.tracks[i].sample.id)
      tempArray = []
    }
    
    formData.append('name', this.newSavedProject.name)
    formData.append('userId', this.newSavedProject.userId)
    formData.append('sampleIds', tempSampleIds.join())
    formData.append('pattern', tempPattern.join())
    formData.append('bPM', this.tempo.toString())

    this.projectRestService.AddSavedProject(formData).subscribe();
    
    alert(`${this.newSavedProject.name} has been saved!`);

    this.hideForm()
  }
}